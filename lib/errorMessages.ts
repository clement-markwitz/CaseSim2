export const AUTH_ERRORS: Record<string, string> = {
    // Erreurs d'inscription
    'User already registered': 'Ce compte existe déjà. Essaie de te connecter.',
    'Email already in use': 'Cette adresse email est déjà utilisée.',

    // Erreurs de connexion
    'Invalid login credentials': 'Email ou mot de passe incorrect.',
    'Email not confirmed': 'Confirme d\'abord ton email.',

    // Erreurs de validation
    'Invalid email': 'Adresse email invalide.',
    'Password should be at least 6 characters': 'Mot de passe trop court (min. 6 caractères).',

    // Erreurs de rate limit
    'Email rate limit exceeded': 'Trop de tentatives. Réessaie dans 5 minutes.',

    // Erreurs réseau
    'Failed to fetch': 'Problème de connexion. Vérifie ton internet.',
};

export function getErrorMessage(error: any): string {
    const message = error?.message || '';

    // Cherche un message exact
    if (AUTH_ERRORS[message]) {
        return AUTH_ERRORS[message];
    }

    // Cherche par mots-clés
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('already') || lowerMessage.includes('registered')) {
        return 'Ce compte existe déjà. Essaie de te connecter.';
    }

    if (lowerMessage.includes('rate limit')) {
        return 'Trop de tentatives. Patiente quelques minutes.';
    }

    if (lowerMessage.includes('invalid') && lowerMessage.includes('credentials')) {
        return 'Email ou mot de passe incorrect.';
    }

    if (lowerMessage.includes('email') && lowerMessage.includes('confirm')) {
        return 'Vérifie ton email pour confirmer ton compte.';
    }

    // Message par défaut
    return message || 'Une erreur est survenue. Réessaie plus tard.';
}