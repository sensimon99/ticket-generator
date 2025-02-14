import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SelectTicket.css";

const SelectTicket = () => {
    const tickets = [
        { id: 1, name: "Regular Access", price: "FREE", left: 20 },
        { id: 2, name: "VIP Access", price: "$50", left: 20 },
        { id: 3, name: "VVIP Access", price: "$150", left: 20 }
    ];

    const [selectedTicket, setSelectedTicket] = useState(tickets[0].id);
    const [ticketCount, setTicketCount] = useState("1");

    const handleSelect = (id) => {
        setSelectedTicket(id);
    };

    const handleTicketCountChange = (e) => {
        setTicketCount(e.target.value);
    };

    const saveTicketDetails = () => {
        const selected = tickets.find(ticket => ticket.id === selectedTicket);
        if (selected) {
            localStorage.setItem("selectedTicketType", selected.name);
            localStorage.setItem("selectedTicketCount", ticketCount);
        }
    };

    return (
        <div className="ticket">
            <header>
                <div className="heading">
                    <p className="ticket-paragraph-i">Ticket Selection</p>
                    <p className="ticket-paragraph-ii">Step 1/3</p>
                </div>
                <div className="line-2">
                    <span className="line-i-2"></span>
                </div>
            </header>

            <section>
                <div className="section-title">
                    <div className="section-heading">Techember Fest '25</div>
                    <div className="section-text">
                        Join us for an unforgettable experience at Techember Fest '25! Secure your spot now.
                    </div>
                    <div className="section-text-i">
                        <span>📍 04 Rumens road, Ikoyi, Lagos</span>
                        <span className="two-lines">| |</span>
                        <span>March 15, 2025 | 7:00 PM</span>
                    </div>
                </div>

                <div className="section-line"></div>

                <div className="label">Select Ticket Type:</div>

                {/* Ticket Options */}
                <div className="ticket-options">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className={`ticket-option ${selectedTicket === ticket.id ? "selected" : ""}`}
                            onClick={() => handleSelect(ticket.id)}
                        >
                            <div className="ticket-spans">
                                <span className="ticket-name">{ticket.name}</span>
                                <span className="ticket-left">{ticket.left} left!</span>
                            </div>
                            <button className="ticket-btn">{ticket.price}</button>
                        </div>
                    ))}
                </div>

                <div className="label-i">
                    <p className="number">Number of Tickets</p>
                    <div className="select-wrapper">
                        <select name="number" id="number" value={ticketCount} onChange={handleTicketCountChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <div className="form-buttons">
                    <button className="btn-1">Cancel</button>
                    <Link to="/details" className="btn-link-3">
                        <button className="btn-2" disabled={!selectedTicket} onClick={saveTicketDetails}>
                            Next
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SelectTicket;
