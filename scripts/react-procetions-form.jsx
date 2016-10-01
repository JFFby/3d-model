var ProjectionButton = React.createClass({
    onChange: function(){
        console.log(this.refs.inputName);
    },
    render: function(){
        var name = this.props.name;
        return (
            <div className="profection-type">
                <label htmlFor={name}>{this.props.label}</label>
                <input type="radio" name="projection-type"
                    id={name} ref='inputName'
                    onChange={this.onChange}/>
            </div>
        );
    }
});

var ProjectionForm = React.createClass({
    render:function(){
        return (
            <div className="projection-wrapper">
                <ProjectionButton 
                    name={"proj-ort"} label={"Ортогональная"}/>
                <ProjectionButton 
                    name={"proj-prof"} label={"Профильная"}/>    
                <ProjectionButton 
                    name={"proj-aks"} label={"Аксонометрическая"}/>
            </div>
        );
    }
});

ReactDOM.render(
    <ProjectionForm />,
    document.getElementById('projection-form')
);