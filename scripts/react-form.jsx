
var Form = React.createClass({
    render: function(){
        return (
            <div className="field-wrapper">
                 <Input data={"r1"} value={shapes_settings.r1} ref="r1"/>
				 <Input data={"r2"} value={shapes_settings.r2} ref="r2"/>
				 <Input data={"h"} value={shapes_settings.h} ref="h"/>
				 <Input data={"n"} value={shapes_settings.n} ref="n"/>
            </div>
        );
    }
});

var Input = React.createClass({
	componentDidMount: function(){
		ReactDOM.findDOMNode(this.refs.inputName).value = this.props.value;
	},
	onChange: _.debounce(function(e){
		var value = ReactDOM.findDOMNode(this.refs.inputName).value;
		shapes_settings[this.props.data] = value;
		d3_model.start(shapes_settings);	
	}, 300),
    render: function(){
        return (
            <div className="field">
                    <label>{this.props.data}</label>
                    <input type="text" ref='inputName' onChange={this.onChange} />
            </div>
        );
    }
});

ReactDOM.render(
    <Form />,
    document.getElementById('form')
);