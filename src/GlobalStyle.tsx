import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    *{
        margin: 0;
        padding: 0;
        outline:0;
        
    }
    #root{
        margin:0 auto;
        font-family: "Inter", sans-serif;
    }
`;
export default GlobalStyle;
