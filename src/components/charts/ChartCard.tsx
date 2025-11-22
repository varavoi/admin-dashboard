import {Card,
     CardContent, 
     Typography
 } from "@mui/material";
 interface ChartCardProps{
    title:string;
    children:React.ReactNode
 }
const ChartCard:React.FC<ChartCardProps> = ({title,children}) => {
    return (
        <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              {children}
            </CardContent>
          </Card>
    );
};

export default ChartCard;