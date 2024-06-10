package main

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/hashicorp/consul/api"
	"github.com/syndtr/goleveldb/leveldb"
	"log"
	"net/http"
	"strconv"
)

// Strukture podataka
type AccessControlList struct {
	Object   string `json:"object"`
	Relation string `json:"relation"`
	User     string `json:"user"`
}

type NamespaceConfig struct {
	Namespace string              `json:"namespace"`
	Version   int                 `json:"version"`
	Relations map[string]Relation `json:"relations"`
}

type Relation struct {
	Union []ComputedUserset `json:"union"`
}

type ComputedUserset struct {
	This            map[string]interface{} `json:"this"`
	ComputedUserset RelationDetail         `json:"computed_userset"`
}

type RelationDetail struct {
	Relation string `json:"relation"`
}

// Globalne promenljive za baze podataka
var db *leveldb.DB
var consulClient *api.Client

// Inicijalizacija LevelDB
func initDB() {
	var err error
	db, err = leveldb.OpenFile("./leveldb", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func closeDB() {
	db.Close()
}

// Inicijalizacija ConsulDB
func initConsul() {
	var err error
	consulClient, err = api.NewClient(api.DefaultConfig())
	if err != nil {
		log.Fatal(err)
	}
}

// Funkcije za namespace u ConsulDB
func createOrUpdateNamespace(namespace NamespaceConfig) error {
	kv := consulClient.KV()

	// Proveri trenutnu verziju
	currentNamespace, err := getNamespace(namespace.Namespace)
	if err != nil {
		return err
	}

	if currentNamespace != nil {
		// Ako namespace postoji, poveća verziju za 1
		namespace.Version = currentNamespace.Version + 1
	} else {
		// Ako namespace ne postoji, postavi početnu verziju na 1
		namespace.Version = 1
	}

	value, err := json.Marshal(namespace)
	if err != nil {
		return err
	}
	p := &api.KVPair{Key: namespace.Namespace + "/" + strconv.Itoa(namespace.Version), Value: value}
	_, err = kv.Put(p, nil)
	return err
}

func getNamespace(namespace string) (*NamespaceConfig, error) {
	kv := consulClient.KV()

	// Pronalaženje najnovije verzije
	pairs, _, err := kv.List(namespace+"/", nil)
	if err != nil {
		return nil, err
	}

	if len(pairs) == 0 {
		return nil, nil
	}

	// Pronađi najnoviju verziju
	var latestPair *api.KVPair
	for _, pair := range pairs {
		if latestPair == nil || pair.ModifyIndex > latestPair.ModifyIndex {
			latestPair = pair
		}
	}

	if latestPair == nil {
		return nil, nil
	}

	var ns NamespaceConfig
	err = json.Unmarshal(latestPair.Value, &ns)
	if err != nil {
		return nil, err
	}
	return &ns, nil
}

// API Endpoint funkcije

func createOrUpdateNamespaceEndpoint(c *gin.Context) {
	var namespace NamespaceConfig
	if err := c.ShouldBindJSON(&namespace); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := createOrUpdateNamespace(namespace)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "Namespace created/updated"})
}

// Funkcije za ACL u LevelDB
func createOrUpdateACL(object, relation, user string) error {
	// Prvo obriši sve postojeće ACL zapise za datog korisnika na ovom objektu
	err := deleteACLForUser(object, user)
	if err != nil {
		return err
	}

	// Dodaj novi ACL zapis
	key := object + "#" + relation + "@" + user
	err = db.Put([]byte(key), []byte{}, nil)
	return err
}

func deleteACLForUser(object, user string) error {
	iter := db.NewIterator(nil, nil)
	defer iter.Release()
	for iter.Next() {
		key := string(iter.Key())
		if strings.HasPrefix(key, object+"#") && strings.HasSuffix(key, "@"+user) {
			err := db.Delete([]byte(key), nil)
			if err != nil {
				return err
			}
		}
	}
	return iter.Error()
}

// API Endpoint funkcije
func createOrUpdateACLEndpoint(c *gin.Context) {
	var acl AccessControlList
	if err := c.ShouldBindJSON(&acl); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := createOrUpdateACL(acl.Object, acl.Relation, acl.User)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ACL created/updated"})
}

// Inicijalizacija i pokretanje servera
func main() {
	r := gin.Default()

	// Inicijalizacija baza podataka
	initDB()
	defer closeDB()
	initConsul()

	// Definisanje ruta
	r.POST("/acl", createOrUpdateACLEndpoint)
	//r.GET("/acl/check", checkACLEndpoint)
	r.POST("/namespace", createOrUpdateNamespaceEndpoint)

	// Pokretanje servera
	r.Run(":8080")
}
