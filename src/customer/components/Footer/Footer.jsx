import React from "react";
import { Grid, Typography, Link, Box, IconButton, Container } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  const sections = [
    {
      title: "Company",
      items: ["About", "Blog", "Jobs", "Press", "Partners"],
    },
    {
      title: "Solutions",
      items: ["Marketing", "Analytics", "Commerce", "Insights", "Support"],
    },
    {
      title: "Documentation",
      items: ["Guides", "API Status"],
    },
    {
      title: "Legal",
      items: ["Claim", "Privacy", "Terms"],
    },
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#0d0d0d", // Slightly lighter black for depth
        color: "#e0e0e0", 
        pt: 10, 
        pb: 5, 
        borderTop: "1px solid rgba(255, 255, 255, 0.05)" 
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {sections.map((section) => (
            <Grid key={section.title} item xs={6} sm={6} md={3}>
              <Typography
                variant="subtitle1" // More refined than h6 for footers
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: "white", 
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.9rem"
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                {section.items.map((item) => (
                  <Box component="li" key={item} sx={{ mb: 1.5 }}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: "#999",
                        fontSize: "0.875rem",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#00bcd4",
                          paddingLeft: "5px", // Subtle slide effect on hover
                        },
                      }}
                    >
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Divider line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 8,
            mb: 4,
          }}
        />

        <Grid container alignItems="center">
          {/* Copyright Text */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" }, mb: { xs: 3, md: 0 } }}>
            <Typography variant="body2" sx={{ color: "#777" }}>
              © {new Date().getFullYear()} Tulsi Choudhary. Built with 
              <Link 
                href="https://tulsi-portfolio.vercel.app" 
                target="_blank" 
                sx={{ color: "#00bcd4", mx: 1, fontWeight: 600, textDecoration: "none" }}
              >
                SpringBoot, React, MySQL & Postman
              </Link>
            </Typography>
          </Grid>

          {/* Social Icons with Animation */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, gap: 1 }}>
              {[
                { icon: <GitHub />, link: "https://github.com/Tulsi77choudhary" },
                { icon: <LinkedIn />, link: "https://www.linkedin.com/in/tulsi-choudhary-994058263/" },
                { icon: <Twitter />, link: "https://twitter.com" },
                { icon: <Instagram />, link: "https://instagram.com" }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  sx={{ 
                    color: "#777", 
                    transition: "0.3s",
                    "&:hover": { 
                      color: "#00bcd4", 
                      transform: "translateY(-3px)", // Subtle lift
                      bgcolor: "rgba(0, 188, 212, 0.1)"
                    } 
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
