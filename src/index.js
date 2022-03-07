import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            resorts: []
        };
        this.removeItem = this.removeItem.bind(this);
    };

    async componentDidMount() {
        try {
            const resorts = (await axios.get('/api/ski_resorts')).data;
            // console.log(resorts);
            this.setState({
                resorts
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async removeItem(id) {
        await axios.delete(`/api/ski_resorts/${id}`);
        // this.componentDidMount();
        const resorts = this.state.resorts.filter(_resort => _resort.id !== id);
        this.setState({
            resorts
        });
    }

    render() {
        return (
            <div>
                <h1>Ski Resort Destinations</h1>
                { /* <form onClick>Register New Ski Destination</button> */}
                <table>
                    <tr>
                        <th>Resort</th>
                        <th>Hours of Operation</th>
                        <th>Pass/Ticket</th>
                        <th>Lesson</th>
                        <th>Location</th>
                    </tr>
                    { this.state.resorts.map(resort => 
                        <tr>
                            <td>{ resort.name }
                                <button onClick={ () => this.removeItem(resort.id) }>X</button>
                            </td>
                            <td>{ resort.hours }</td>
                            <td>{ resort.ticket }</td>
                            <td>{ resort.lesson }</td>
                            <td>{ resort.location }</td>
                        </tr>
                        ) }
                </table>    
            </div>
        );
    };
};

const root = document.querySelector('#root');
ReactDOM.render(<Main />, root);