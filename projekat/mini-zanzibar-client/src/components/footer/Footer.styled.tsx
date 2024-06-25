import styled from "styled-components";

export const FooterSection = styled.div`
  background-color: #1b2433;
`;

export const FooterContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  color: white;
  border-bottom: 2px solid #293241;
  border-radius: 2px;

  @media screen and (max-width: 700px) {
    padding: 24px;
  }
`;

export const FtInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FtTitle = styled.p`
  color: #eeb750;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: .8px;

  @media screen and (max-width: 700px) {
    text-align: center;
  }
`;


export const FtDescription = styled.p`
  width: 420px;
  margin: 16px 0 40px;
  color: #d0d3da;
  font-family: 'Rubik', sans-serif;
  font-size: 20px;
  letter-spacing: .8px;
  line-height: 1.7rem;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 16px 0 24px;
    text-align: center;
  }
`;

export const FtList = styled.div`
  margin: 16px 0;
  text-align: left;
`;

export const FtListTitle = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: .8px;
  margin-left: 38px;
`;

export const FtListItems = styled.ul`
  list-style-type: none;
`;

export const FtListItem = styled.li`
  margin: 24px 0;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: .8px;

  a {
    text-decoration: none;
    color: #a5a7ac;
    padding: 0 0 2px 0;
    border-bottom: 2px dotted transparent;
    transition: border .2s ease;

    &:hover {
      border-bottom: 2px dotted #a5a7ac;
    }
  }
`;

export const FtCopyright = styled.div`
  padding: 2px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cbcdd3;
  font-family: 'Rubik', sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: .8px;

  @media screen and (max-width: 700px) {
    padding: 18px;
    display: block;
    text-align: center;
  }
`;

export const FtSocialLinks = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 700px) {
    margin: 16px 0 0;
  }

  li {
    a {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #cbcdd3;
      border-radius: 50%;
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
        padding: 1px;
      }

      svg path {
        fill: #cbcdd3;
      }

      &:hover,
      &:hover svg path {
        fill: #eeb750;
        border: 2px solid #eeb750;
      }
    }
  }
`;
export const InputTitle = styled.p`
      color: white;
    font-family: 'Rubik', sans-serif;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: .8px;

    @media screen and (max-width: 700px) {
    text-align: center;
  }
`

export const Input = styled.input`
    width: 250px;
    margin: 10px 8px 0 0;
    padding: 16px 22px;
    color: white;
    background-color: #293241;
    border: 1px solid transparent;
    border-radius: 50px;
    outline: transparent;
    font-family: 'Rubik', sans-serif;
    font-size: 18px;
    letter-spacing: .8px;

    @media screen and (max-width: 700px) {
      margin-left: 60px;
  }

`

export const Button = styled.button`
    padding: 14px 18px;
    color: white;
    border: 2px solid transparent;
    border-radius: 50px;
    outline: transparent;
    background-color: #eeb750;
    font-size: 18px;
    font-family: 'Rubik', sans-serif;
    letter-spacing: .8px;
    cursor: pointer;
    transition: all .4s ease;

    &:hover {
    color: #eeb750;
    background-color: white;
    border: 2px solid #eeb750;
    @media screen and (max-width: 700px) {
    margin-left: 60px;
  }
}
`


