var ProjectionButton = React.createClass((function(){

    var getName = function(element){
        return this.refs.inputName.id.replace('proj-', '');
    };

    return {
        onClick: function(){
            this.props.onClick && this.props.onClick(this, getName.call(this));
        },
        render: function(){
            var name = this.props.name;
            var data = {
                getName: getName
            };
            return (
                <div className="profection-type">
                    <label htmlFor={name}>{this.props.label}</label>
                    <input type="radio" name="projection-type"
                        id={name} ref='inputName'
                        onClick={this.onClick}/>
                </div>
            );
        }
    };
})());

var ProfectionAdditionControls = React.createClass({
    componentDidMount: function(){
        this.refs.inputName.value = this.props.value;
    },
    onChange: function(){
        this.props.onChange(this);
    },
    render: function(){
        var id = this.props.id;
        var wrapperClass = 'proj-control-wrapper ' + id;
        return (
            <div className={wrapperClass}>
                <label htmlFor={id}>{id}</label>    
                <input id={id} type="text" onChange={this.onChange} ref='inputName'/>
            </div>
        );
    }
});

var ProjectionForm = React.createClass((function(){
    
    var additionalControlsInfo = {
        aks: {
            p1: {
                name: 'alpha',
                value: 20
            },
            p2: {
                name: 'sigma',
                value: 20
            }
        },
        kos: {
            p1: {
                name:  'l',
                value: 1    
            },
            p2: {
                name: 'alpha',
                value: 10
            }
        },
        persp:{
            p1:{
                name: 'd',
                value: 1
            },
            p2:{
                name: 'none',
                value: 0
            }
        }
    };
    
    var processRadioChange = function(name){
        var config = additionalControlsInfo[name];
        var state = {showControls: false, proj: name};
        if(config) {
            state.showControls = true;
            _.merge(state, config);
        }

        this.setState(state);
        return getProjection.call({state: state});
    };

    var getProjection = function(){
        var p1 = this.state.p1;
        return {
            proj: this.state.proj,
            p1: p1 ? p1.value : 0,
            p2: p1 ? this.state.p2.value : 0
        };
    };

    var processAdditionalValueChange = function(element){
        var pn = this.state.p1.name == element.id ? 'p1' : 'p2';
        var nextStateValue = {};
        nextStateValue[pn] = {value: +element.value, name: element.id};
        this.setState(nextStateValue);
        var nextValue = {};
        nextValue[pn] = +element.value;
        return _.merge(getProjection.call(this, name), nextValue);
    };

    return {
        getInitialState: function(){
            return {showControls: false};
        },
        onClick: function(target, name){
            var p;
            if(name){
                p = processRadioChange.call(this, name);
            }else {
                var element = target.refs.inputName;
                p = processAdditionalValueChange.call(this, element);
            }
            
            projectionBuilder.create(p.proj, p.p1, p.p2);
        },
        render:function() {
            return (
                <div className="projection-wrapper">
                    <ProjectionButton 
                        name={"proj-front"} label={"Фронтальная"} onClick={this.onClick} />
                    <ProjectionButton 
                        name={"proj-prof"} label={"Профильная"} onClick={this.onClick}/>    
                    <ProjectionButton 
                        name={"proj-gor"} label={"Горизонтальная"} onClick={this.onClick}/>
                    <ProjectionButton 
                        name={"proj-aks"} label={"Аксонометрическая"} onClick={this.onClick}/>
                     <ProjectionButton 
                        name={"proj-kos"} label={"Косоугольная"} onClick={this.onClick}/>  
                    <ProjectionButton 
                        name={"proj-persp"} label={"Перспективная"} onClick={this.onClick}/>   
                    {this.state.showControls ?
                        <ProfectionAdditionControls id={this.state.p1.name}
                            value={this.state.p1.value} onChange={this.onClick} />  :
                         null}
                    {this.state.showControls ? 
                        <ProfectionAdditionControls id={this.state.p2.name} 
                            value={this.state.p2.value}  onChange={this.onClick}/>  :
                         null}
                </div>
                );
        }
    };
})());

ReactDOM.render(
    <ProjectionForm />,
    document.getElementById('projection-form')
);