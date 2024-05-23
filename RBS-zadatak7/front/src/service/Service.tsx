import axios from "axios";

class Service{
  async submit(data: string) {
    try {
        const response = await axios.post('http://localhost:8085/', 
            { data: data }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Server response:", response.data);
    } catch (error) {
        console.error("Error submitting data:", error);
    }
}
}

export default new Service();