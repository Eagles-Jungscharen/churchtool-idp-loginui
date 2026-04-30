import { useState, type FormEvent } from 'react';
import {
  Button,
  Field,
  Input,
  makeStyles,
  tokens,
  Spinner,
} from '@fluentui/react-components';
import { PersonRegular, LockClosedRegular } from '@fluentui/react-icons';
import { login } from '../services/authService';
import { ErrorMessage } from './ErrorMessage';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    width: '100%',
    maxWidth: '400px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitButton: {
    marginTop: tokens.spacingVerticalM,
  },
  errorContainer: {
    marginTop: tokens.spacingVerticalM,
  },
});

interface LoginFormProps {
  authenticationRequestId: string;
}

/**
 * Login-Formular mit Benutzername und Passwort
 */
export const LoginForm: React.FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {
  const { authenticationRequestId } = props;
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Client-seitige Validierung
    if (!username.trim()) {
      setError('Bitte geben Sie einen Benutzernamen ein');
      return;
    }

    if (!password.trim()) {
      setError('Bitte geben Sie ein Passwort ein');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(username, password, authenticationRequestId);

      if (!result.success) {
        setError(result.error || 'Login fehlgeschlagen');
        setIsLoading(false);
      }
      // Bei Erfolg wird der Browser automatisch weitergeleitet (302)
      // Daher keine weitere Aktion nötig
    } catch {
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        label="Benutzername"
        required
        className={styles.field}
      >
        <Input
          contentBefore={<PersonRegular />}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          placeholder="Ihr Benutzername"
          autoComplete="username"
        />
      </Field>

      <Field
        label="Passwort"
        required
        className={styles.field}
      >
        <Input
          contentBefore={<LockClosedRegular />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Ihr Passwort"
          autoComplete="current-password"
        />
      </Field>

      <Button
        appearance="primary"
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
        icon={isLoading ? <Spinner size="tiny" /> : undefined}
      >
        {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
      </Button>

      {error && (
        <div className={styles.errorContainer}>
          <ErrorMessage error={error} />
        </div>
      )}
    </form>
  );
}
