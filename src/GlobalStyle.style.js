import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --button-purple-new: #7C5DFA;
        --button-purple-new-hover: #9277FF;
        --form-dark-input: #1E2139;
        --button-dark-edit: #252945;
        --form-light-input-border: #DFE3FA;
        --date-text-light: #888EB0;
        --text-light-form: #7E88C3;
        --text-light-black: #0C0E16;
        --button-delete: #EC5757;
        --button-delete-hover: #9277FF;
        --light-background: #F8F8FB;
        --dark-background: #141625;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
    html {
        max-width: 1920px;
        margin: 0 auto;
    }
    body {
        margin: 0;
        padding: 0;
        color: var(--text-light-black);
        background: var(--light-background);
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.25px;
        font-family: "Spartan", sans-serif;
    }

    h1 {
        font-size: 32px;
        line-height: 36px;
        letter-spacing: -1px;
    }

    h2 {
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.63px;
    }

    h3 {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.8px;
    }
`;
