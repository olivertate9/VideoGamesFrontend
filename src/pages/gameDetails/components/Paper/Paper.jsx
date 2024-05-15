import PaperMUI from '@mui/material/Paper';

function Paper({elevation, children}) {
    return (
        <PaperMUI
            elevation={elevation}
            style={{padding: '16px'}}
        >
            {children}
        </PaperMUI>
    )
}

export default Paper;