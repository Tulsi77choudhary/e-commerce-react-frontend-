import { styled, Card, CardContent, Typography, Button } from '@mui/material';
import React from 'react';

const TrignleImg = styled('img')({
  right: 0,
  height: '170px',
  position: 'absolute',
});

const TrophyImg = styled('img')({
  right: '36px',
  height: '98px',
  position: 'absolute',
  bottom: '20px',
});

const Achivement = () => {
  return (
    <Card className="space-y-6" sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: '0.25px' }}>
          Achievement
        </Typography>
        <Typography >
          Congratulations <strong>John!</strong>
        </Typography>
        <Typography sx={{ my: 1 }}>429.3k</Typography>
        <Button size="small" variant="contained">
          View Details
        </Button>

        <TrophyImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58XPRws1vJljh_gboi7d2be_EJ0egaj_qPU5_WofaZbKadUJVkViMUfVYvoEyaz97LOg&usqp=CAU" />
      </CardContent>
    </Card>
  );
};

export default Achivement;
