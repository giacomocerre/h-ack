import { MainChat } from '../containers/MainChat';
import { TwinApiProvider } from '../containers/providers/TwinApiProvider';
import env from 'react-dotenv'


const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

const ChatComponent = () => {
    return (
        <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
            <div style={{ height: '100vh' }}>
                <MainChat />
            </div>
        </TwinApiProvider>);

};

export default ChatComponent;