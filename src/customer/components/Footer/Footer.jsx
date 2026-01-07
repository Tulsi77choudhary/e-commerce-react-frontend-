import React from "react";
import { Button, Grid, Typography, Link, Box, IconButton } from "@mui/material";
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
    <Box sx={{ bgcolor: "#0a0a0a", color: "white", py: 6, px: { xs: 3, sm: 8 } }}>
      <Grid container spacing={5} justifyContent="center">
        {sections.map((section) => (
          <Grid key={section.title} item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 2, color: "#00bcd4" }}
            >
              {section.title}
            </Typography>
            {section.items.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "white",
                  textTransform: "none",
                  display: "block",
                  textAlign: "left",
                  p: 0,
                  mb: 1,
                  "&:hover": {
                    color: "#00bcd4",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Grid>
        ))}

        {/* Divider line */}
        <Grid item xs={12}>
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              my: 3,
              width: "100%",
            }}
          />
        </Grid>

        {/* Social Icons */}
        <Grid item xs={12} textAlign="center">
          <Box sx={{ mb: 2 }}>
            <IconButton
              href="https://github.com/Tulsi77choudhary"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#00bcd4" } }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/tulsi-choudhary-994058263/"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#00bcd4" } }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#00bcd4" } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#00bcd4" } }}
            >
              <Instagram />
            </IconButton>
          </Box>

          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Tulsi Choudhary | All rights reserved.
          </Typography>
          <Typography variant="body2" align="center">
            Made with ❤️ by{" "}
            <Link
              href="https://tulsi-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#00bcd4", fontWeight: "bold", textDecoration: "none" }}
            >
              Tulsi Choudhary
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
