var Tab = React.createClass({
    componentDidMount: function() {
        var value = !!this.props.checked;
        ReactDOM.findDOMNode(this.refs.inputName).checked = value;
        value ? this.onChange() : void(0);
    },
    onChange: function(){
        var forms = document.getElementsByClassName('form-container');
        for (var e = 0; e < forms.length; e++){
            var element = forms[e];
            var displayClass = element.className.indexOf(this.props.id) > 0
            ? 'block' : 'none';
            element.style.display = displayClass;
            var event = this.props.event;
            event && event();
        }

    },
    render: function(){
        return (
            <li className="tab-wrapper">
                <label htmlFor={this.props.id}>{this.props.data}</label>
                <input onChange={this.onChange} type="radio"
                     name="tab" id={this.props.id} ref='inputName'/>
            </li>
        );
    }
});

var Tabs = React.createClass((function(){

    function clearProjections(){
        var projections = 
        document.getElementsByClassName('profection-type');
        for(var i = 0; i < projections.length; ++i){
            var radio = projections[i].getElementsByTagName('input')[0];
            radio.checked = false;
        }
    }

    return {
        render: function(){
            return (
                <ul className="tabs-wrapper">
                    <Tab data={"transformations"} id={"transform"}
                        checked={true} event={clearProjections}/>
                    <Tab data={"projections"} id={"projection"}/>
                </ul>
            );
        }
    };
})());

ReactDOM.render(
    <Tabs />,
    document.getElementById('tabs')
);