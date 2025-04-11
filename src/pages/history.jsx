import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        };
        fetchHistory();
    }, []);

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "url('/home.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* Navbar */}
            <div style={{
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(5px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                padding: "15px 20px",
                zIndex: 1000
            }}>
                <IconButton 
                    onClick={() => routeTo("/home")} 
                    style={{ color: "#3f51b5", fontSize: "24px", marginLeft: "10px" }}
                >
                    <HomeIcon />
                </IconButton>
                <Typography 
                    variant="h6" 
                    style={{ marginLeft: "10px", fontWeight: "bold", color: "#3f51b5" }}
                >
                    Meeting History
                </Typography>
            </div>

            {/* Content */}
            <div style={{ marginTop: "80px", width: "100%", maxWidth: "600px" }}>
                {
                    (meetings.length !== 0) ? meetings.map((e, i) => {
                        return (
                            <Card key={i} variant="outlined" 
                                style={{
                                    marginBottom: "15px",
                                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                    padding: "15px",
                                    transition: "transform 0.2s",
                                    backgroundColor: "white",
                                    borderRadius: "10px"
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", color: "#3f51b5" }}>
                                        Code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5, color: "#757575" }}>
                                        Date: {formatDate(e.date)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    }) : (
                        <Typography variant="h6" style={{ color: "white", marginTop: "20px" }}>
                            No history available.
                        </Typography>
                    )
                }
            </div>
        </div>
    );
}  
