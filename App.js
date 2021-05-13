const CardList=(props)=>(
  <div>
    {props.profiles.map(profile=> <Card key={profile.id} {...profile}/>)}
    </div>
);

function Form(props) {
  
  const [userName,setName] = useState('');  
  
  function handleChange(event){
    setName(event.target.value);
  }
  const handleOnSubmit=async (event)=>{
    event.preventDefault();
    
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setName('');
    
    
  };
  
  return(
  <form onSubmit={handleOnSubmit}>
    <input 
      type="text" placeholder="Github Profile"
      value={userName}
      onChange={handleChange}
      
      required
      />
      <button>Add Card</button>
    
    </form>
  );
  
}

function Card (props){
  
    const profile= props;
    return (
      <div className="github-profile" >
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    </div>
    
    );
  
}

function App(props) {
 
  const [profiles,setProfiles]=useState([]);
  
  const addNewProfile=(profileData)=>{
    
    setProfiles(profiles=>profiles.concat(profileData));
    
  };
  
  	return (
    	<div>
    	  <div className="header">{props.title}</div>
        <Form onSubmit={addNewProfile}/>
        <CardList profiles={profiles} />
    	</div>
    );
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
