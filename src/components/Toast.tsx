import { Snackbar, Alert} from '@mui/material';
import type {AlertColor} from '@mui/material';
interface ToastProps{
    open:boolean;
    message:string;
    severity:AlertColor;
    onClose:()=>void;
    duration?:number;
}

const Toast:React.FC<ToastProps> = ({
    open,
    message,
    severity,
    onClose,
    duration=3000,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{vertical: 'top', horizontal: 'right' }}
        >
            <Alert 
                onClose={onClose} 
                severity={severity}
                sx={{width:'100%'}}
                >
                    {message}
                </Alert>
        </Snackbar>
    );
};

export default Toast;