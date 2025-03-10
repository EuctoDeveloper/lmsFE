    import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

    const SlotPicker = ({ bookedSlots, selectedDate, onChange=()=>{}, onNonContinuousError }) => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const start = String(i).padStart(2, "0") + ":00";
        const end = String(i + 1).padStart(2, "0") + ":00";
        return { start, end };
    });

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTimeRange, setSelectedTimeRange] = useState(null);
    const dropdownRef = useRef(null);

    const isToday = dayjs().isSame(selectedDate, "day");
    const currentHour = dayjs().hour();
  

    const handleSelectSlot = (index) => {
        if (bookedSlots.includes(index)) return;

        let newSelection = [];
        let isValidSelection = true;

        if (selectedSlots.includes(index)) {
            newSelection = selectedSlots.filter((i) => i !== index);
            setErrorMessage("");
        } else {
        const min = Math.min(...selectedSlots, index);
        const max = Math.max(...selectedSlots, index);
        
        newSelection = [];
        for (let i = min; i <= max; i++) {
            if (bookedSlots.includes(i)) {
            isValidSelection = false;
            break;
            }
            newSelection.push(i);
        }

        if (!isValidSelection) {
            onNonContinuousError(); 
            setErrorMessage("Only continuous slots can be selected.");
            return;
        } else {
            setErrorMessage("");
        }
        }

        setSelectedSlots(newSelection);
    };

    useEffect(() => {
        setSelectedTimeRange(
            selectedSlots.length > 0
                ? `${timeSlots[selectedSlots[0]].start} to ${timeSlots[selectedSlots[selectedSlots.length - 1]].end}`
                : null
        );
    }
    , [selectedSlots]);

    useEffect(() => {
        onChange(selectedTimeRange);
    }
    , [selectedTimeRange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
          }
        };
    
        if (dropdownOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropdownOpen]);

    return (
        <div style={{ position: "relative", width: "250px" }} ref={dropdownRef}>
        <input
            type="text"
            value={selectedTimeRange}
            readOnly
            placeholder="Select Time Slots"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
                width: "100%",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        />
        {dropdownOpen && (
            <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            padding: "10px",
            zIndex: 1000,
            }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {timeSlots.map((slot, index) => {

              const isPast = isToday && index <= currentHour;
              const isBooked = bookedSlots.includes(index);
              const isSelected = selectedSlots.includes(index);
              return (
                <button
                    type="button"
                    key={index}
                    style={{
                    padding: "8px",
                    fontSize: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    cursor: isBooked || isPast ? "not-allowed" : "pointer",
                    backgroundColor: isBooked || isPast
                      ? "#d3d3d3"
                      : isSelected
                      ? "#4CAF50"
                      : "#ffffff",
                    color: isBooked || isPast || isSelected ? "#fff" : "#000",
                    }}
                    onClick={() => handleSelectSlot(index)}
                    disabled={isBooked || isPast}
                >
                    {slot.start} - {slot.end}
                </button>
                )})}
            </div>
            </div>
        )}
        </div>
    );
    };

    export default SlotPicker;
