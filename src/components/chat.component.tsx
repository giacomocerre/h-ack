import { MainChat } from '../containers/MainChat';

const ChatComponent = () => {
    console.log("RENDERING CHAT COMPONENT")
    return (
            <div style={{ height: '100vh' }}>
                <MainChat />
            </div>
        );

};

export default ChatComponent;