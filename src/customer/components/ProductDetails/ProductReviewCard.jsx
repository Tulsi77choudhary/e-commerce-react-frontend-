import React from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import Rating from '@mui/material/Rating';
export const ProductReviewCard = () => {
    return (
        <div>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{ width: 55, height: 55, backgroundColor: "#9155fd", fontSize: "1.5rem" }}></Avatar>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <div className='space-y-2'>
                <div>
                    <p className='font-semibold text-lg'>Raam</p>
                    <p className='opacity-70'>April 5,2023</p>
                </div>
                </div>
                <Rating value={4.5} name='half-rating' readOnly precision={0.5}>
                    <p>nice product, i love product</p>
                </Rating>
            </Grid>
        </div >
    )
}
