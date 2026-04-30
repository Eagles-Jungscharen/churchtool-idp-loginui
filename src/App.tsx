import { useEffect, useState } from 'react';
import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import { LoginLayout } from './components/LoginLayout';
import { LoginForm } from './components/LoginForm';
import { appConfig } from './config/appConfig';
import { getAuthorizationRequestId, hasAuthorizationRequestId } from './utils/urlUtils';

function App() {
  const [authRequestId, setAuthRequestId] = useState<string | null>(null);
  const [hasValidParam, setHasValidParam] = useState(false);

  useEffect(() => {
    // Prüfe beim Mount, ob der authorization_request_id Parameter vorhanden ist
    const id = getAuthorizationRequestId();
    const isValid = hasAuthorizationRequestId();
    
    setAuthRequestId(id);
    setHasValidParam(isValid);
  }, []);

  // Wenn der Parameter fehlt, zeige eine Fehlermeldung
  if (!hasValidParam || !authRequestId) {
    return (
      <LoginLayout
        title={appConfig.appTitle}
        description={appConfig.appDescription}
        backgroundImageUrl={appConfig.backgroundImageUrl}
      >
        <MessageBar intent="error">
          <MessageBarBody>
            <MessageBarTitle>Ungültiger Aufruf</MessageBarTitle>
            Diese Seite erfordert einen gültigen authorization_request_id Parameter in der URL.
          </MessageBarBody>
        </MessageBar>
      </LoginLayout>
    );
  }

  return (
    <LoginLayout
      title={appConfig.appTitle}
      description={appConfig.appDescription}
      backgroundImageUrl={appConfig.backgroundImageUrl}
    >
      <LoginForm authenticationRequestId={authRequestId} />
    </LoginLayout>
  );
}

export default App;
