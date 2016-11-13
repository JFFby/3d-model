(function(){

    const pattern = 'x:\\s*(\\d+);\\s*y:\\s*(\\d+);\\s*z:\\s*(\\d+)';

    var getLightPointValue = function(){
        return `x: ${light_point.x}; y: ${light_point.y}; z: ${light_point.z};`;
    }

    class LightInput extends React.Component{
        constructor(){
            super();
            this.state = {
                value: getLightPointValue()
            };

            var self = this;
            lightPointHandler.onChange = function(){
                self.onDrag();
            };
        }

        onChange(){
            let regex = new RegExp(pattern);
            let value = ReactDOM.findDOMNode(this.refs.light).value
            this.setState({value: value});
            if(regex.test(value)){
                let result = regex.exec(value);
                lightPointHandler.pushChanges(result[1], result[2], result[3])
            }
        }

        onDrag(){
            this.setState({value: getLightPointValue()});
        }

        render(){
            var value = this.state.value;

            return (
                <div className="light-wrapper">
                    <label htmlFor="light-input">light:</label>
                    <input type="text" id="light-input" ref='light'
                        value={value} onChange={() => this.onChange()}/>
                </div>
            );
        }
    }

    ReactDOM.render(
        <LightInput />,
        document.getElementById('light-continer')
    );
})();