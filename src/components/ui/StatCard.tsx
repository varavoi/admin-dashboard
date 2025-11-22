import { Card, CardContent, Typography, Box } from "@mui/material";
interface PropsStat {
  title?:string;
  value?:string|number;
  icon?:React.ReactNode;
  color?:string;
}
const StatCard = ({ title, value, icon, color }: PropsStat) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              color: color,
              fontSize: 48,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
