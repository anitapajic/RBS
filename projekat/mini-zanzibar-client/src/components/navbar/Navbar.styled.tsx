import styled from 'styled-components';

export const NavbarStyle = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 55px;
        background-color: white;

        @media (max-width: 768px) {
        padding: 10px 20px;
    }
    `
export const Title = styled.a`
        color: ${({theme}) => theme.colors.main2};
        margin: 0;
        cursor : pointer;
        text-decoration: none;
        font-weight: bold;
        font-size: 26px;

        &:hover {
            text-decoration: underline;
        }
    `;

export const Menu = styled.ul<{isOpen: boolean}>`
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 30px;

        @media (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 59px;
        left: 0;
        z-index: 1001;
    }
    `;

export const MenuItem = styled.li`
        display: inline-block;

        @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
    `;

export const MenuLink = styled.a`
        color: black;
        text-decoration: none;
        //font-weight: bold;
        font-size: ${({theme}) => theme.fontSizes.large};

        &:hover {
            color: ${({theme}) => theme.colors.main2};
        }
    `;

export const Hamburger = styled.div`
display: none;
color: black;

@media (max-width: 768px) {
    display: block;
    cursor: pointer;
}
`;