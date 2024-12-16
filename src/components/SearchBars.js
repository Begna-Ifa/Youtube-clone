import React from "react";
import { Paper, TextField, InputAdornment } from "@mui/material"; // Import InputAdornment for icon
import SearchIcon from "@mui/icons-material/Search"; // Import Search Icon

class SearchBars extends React.Component {
    state = {
        searchTerm: "",
    };

    handleChange = (event) => this.setState({ searchTerm: event.target.value });

    handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const { searchTerm } = this.state;
        const { onFormSubmit } = this.props;

        if (typeof onFormSubmit === "function") {
            onFormSubmit(searchTerm); // Call the onFormSubmit function passed from parent
        }
    };

    render() {
        return (
            <Paper elevation={6} style={{ padding: "25px" }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Search..."
                        onChange={this.handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </Paper>
        );
    }
}

export default SearchBars;
