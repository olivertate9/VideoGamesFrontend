import TypographyMUI from "@mui/material/Typography";

function Typography({variant, children}) {
    return(
        <TypographyMUI variant={variant}>
            {children}
        </TypographyMUI>
    )
}

export default Typography;