import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface DebugDataProps {
  data: any;
  title: string;
}

const DebugData: React.FC<DebugDataProps> = ({ data, title }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title} (отладка)
        </Typography>
        <Box sx={{ 
          maxHeight: 200, 
          overflow: 'auto', 
          backgroundColor: '#f5f5f5', 
          p: 1,
          borderRadius: 1 
        }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DebugData;