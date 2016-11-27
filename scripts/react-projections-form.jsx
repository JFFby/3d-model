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
            }
        },
        vp: {
            p1:{
                name: 'theta',
                value: 270
            },
            p2:{
                name: 'fi',
                value: 0
            },
            p3: {
                name: 'ro',
                value: 100
            },
            p4: {
                name: 'd',
                value: 100
            }
        }
    };
    
    var delayedSetter = function(p){
        var timer = setTimeout(function(){
            var input = document.getElementById(p.name);
            if(!input){
                delayedSetter(p);
            }

            input.value = p.value;
        }, 15);
    };

    var updateParameters = function(config){
        for(var p in config){
            if(config.hasOwnProperty(p)){
                delayedSetter(config[p]);
            }
        }
    };

    var processRadioChange = function(name){
        
        var config = additionalControlsInfo[name] || {};
        var state = { proj: name};
        updateParameters(config);
         _.merge(state, {controls: config});

        this.setState(state);
        return getProjection.call({state: state});
    };

    var getProjection = function(){
        var args = [this.state.proj];
        var i = 1;
        for(var p in this.state.controls){
            if(this.state.controls.hasOwnProperty(p)){
                args[i++] = this.state.controls[p].value;
            }
        }

        return args;
    };

    var processAdditionalValueChange = function(element){
        var oldValueObject = _.find(this.state.controls, {name: element.id});
        oldValueObject.value = +element.value;
        this.setState(this.state);
        return getProjection.call({state: this.state}, name);
    };

    var updateViewPoint = function(args){
        if(args[0] === 'vp'){
            view_point.fromCCS(args[3], args[2], args[1]);
        }
    }

    return {
        getInitialState: function(){
            return {showControls: false};
        },
        onClick: function(target, name){
            var args;
            
            if(name){
                args = processRadioChange.call(this, name);
            }else {
                var element = target.refs.inputName;
                args = processAdditionalValueChange.call(this, element);
            }
            
            updateViewPoint(args);

            projectionBuilder.create(args);
        },
        render:function() {
            var controls = this.state.controls;
            var htmlControls = [];
            var i = 0;
            if(controls){
                for(var p in controls){
                    htmlControls[i] = <ProfectionAdditionControls id={controls[p].name}
                        value={controls[p].value} onChange={this.onClick} key={i} />
                    ++i;
                }  
            }

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
                    <ProjectionButton 
                        name={"proj-vp"} label={"Видовое преобразование"} onClick={this.onClick}/>       
                        {htmlControls.map((o, i) => o)}
                </div>
                );
        }
    };
})());

ReactDOM.render(
    <ProjectionForm />,
    document.getElementById('projection-form')
);