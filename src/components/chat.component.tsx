import { Link } from 'react-router-dom';
import { MainChat } from '../containers/MainChat';
import { TwinApiProvider } from '../containers/providers/TwinApiProvider';
import env from 'react-dotenv'


const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

const ChatComponent = () => {
    return (
        <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
            <div style={{ height: '100vh' }}>
                <MainChat />
                <Link to="/suggest"><p className='history-suggest'>Last Time</p></Link>
            </div>
        </TwinApiProvider>);

};

export default ChatComponent;