import { FunctionComponent } from 'react';
import { MainChat } from '../containers/MainChat';
import { TwinApiProvider } from '../containers/providers/TwinApiProvider';
import env from 'react-dotenv'

const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

export type ChatComponentProps = {
    birthDate: string
    newSession?: boolean
    sessionStarted: () => void
}
const ChatComponent: FunctionComponent<ChatComponentProps> = ({birthDate, newSession, sessionStarted}) => {
    console.log("RENDERING CHAT COMPONENT")
    return (
            <div className="S--focusing" style={{ height: '100vh' }}>
            <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
                <MainChat birthDate={birthDate} newSession={newSession} sessionStarted={sessionStarted} />
            </TwinApiProvider>
            </div>
        );

};

export default ChatComponent;