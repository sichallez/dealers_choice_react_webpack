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
        this.insertItem = this.insertItem.bind(this);
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

    async insertItem() {
        // console.log('inserted!!');
        try {
            const response = await axios.post('/api/ski_resorts');
            const newResort = response.data;
            // console.log(response.data);
            const resorts = [...this.state.resorts, newResort];
            this.setState({ 
                resorts
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <h1>Ski Resort Destinations</h1>
                { /* Using a <form> component in React to POST data is not working like a normal html form
                   * need to read more React form documentation in order to fix those bugs! */ }
                <form action='/api/ski_resorts' method='POST'>
                { /* <form onSubmit={ this.insertItem }> */ }
                    <p>Register New Ski Destination</p>
                    Resort Name: <input type='text' name='name' />
                    Location: <input type='text' name='location' />
                    Website: <input type='text' name='website' /><br />
                    Hours of Operation: <br /> <textarea row='5' cols='50' name='hours' /><br />
                    Pass/Ticket: <br /> <textarea row='5' cols='50' name='ticket' /><br />
                    Lesson: <br /> <textarea row='5' cols='50' name='lesson' /><br />
                    { /* <input type='submit' name='submit' value='Create' onClick={ this.insertItem } /> */ }
                    <button onClick={ this.insertItem }>Create</button>
                    { /* <button type='submit'>Create</button>  */ }
                </form>
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