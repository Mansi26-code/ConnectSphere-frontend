import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            {/* NAVBAR */}
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100%",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "rgba(0, 0, 50, 0.9)", padding: "15px 30px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 1000
            }}>
                <h2 style={{ color: "#fff", margin: 0, fontWeight: "bold", letterSpacing: "1px" }}>ConnectSphere</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <IconButton onClick={() => navigate("/history")}
                        style={{
                            background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
                            color: "#fff", boxShadow: "2px 2px 8px rgba(0,0,0,0.4)"
                        }}>
                        <RestoreIcon />
                    </IconButton>
                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}
                        style={{
                            background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
                            color: "#fff", padding: "8px 15px", borderRadius: "5px",
                            boxShadow: "3px 3px 10px rgba(0,0,0,0.4)", fontWeight: "bold"
                        }}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* MAIN CONTAINER */}
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center",
                justifyContent: "center", background: "url('/home.avif') no-repeat center center/cover",
                padding: "120px 20px"
            }}>
                <div style={{
                    display: "flex", maxWidth: "900px", width: "100%",
                    background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)",
                    padding: "40px", borderRadius: "15px", boxShadow: "5px 5px 15px rgba(0,0,0,0.3)"
                }}>
                    {/* LEFT PANEL */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: "bold" }}>
                           Connecting People and Providing Quality Video Call
                        </h2>
                        <div style={{ display: 'flex', gap: "10px", marginTop: "20px" }}>
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                style={{
                                    background: "#fff", borderRadius: "5px",
                                    boxShadow: "2px 2px 6px rgba(0,0,0,0.2)"
                                }}
                            />
                            <Button onClick={handleJoinVideoCall} variant='contained'
                                style={{
                                    background: "linear-gradient(135deg, #FF8C00 0%, #FF4500 100%)",
                                    color: "#fff", padding: "10px 20px", borderRadius: "5px",
                                    boxShadow: "3px 3px 10px rgba(0,0,0,0.4)", fontWeight: "bold"
                                }}>
                                Join
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src='/logo3.png' alt="Logo" 
                            style={{
                                width: "200px", height: "200px", borderRadius: "50%",
                                border: "4px solid white", boxShadow: "3px 3px 10px rgba(0,0,0,0.4)"
                            }} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent);
