import { React, ReactNative } from "@metro/common";
import { findByProps, findByStoreName } from "@metro/wrappers";
import { useProxy } from "@core/vendetta/storage";
import { showConfirmationAlert } from "@core/vendetta/alerts";
import { showToast } from "@ui/toasts";

import { storage } from "./storage";

const UserStore = findByStoreName("UserStore");
const TokenManager = findByProps("getToken");

export default function TrocarContas() {
  useProxy(storage);

  const [switchingTo, setSwitchingTo] = React.useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);

  const currentUserId = UserStore.getCurrentUser()?.id;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const orderedAccounts = (storage.accountOrder || [])
    .filter((id: string) => storage.accounts[id])
    .map((id: string) => storage.accounts[id]);

  const switchToAccount = async (accountId: string) => {
    const account = storage.accounts[accountId];
    if (!account) return;
    setSwitchingTo(accountId);

    try {
      showToast(`Trocando para ${account.username}...`);
      await findByProps("login", "logout", "switchAccountToken").switchAccountToken(account.token);
      showToast(`Trocou para ${account.username}!`);
    } catch (e: any) {
      console.error("Erro ao trocar:", e);
      showToast(`Falha ao trocar: ${e.message}`);
    }
    setSwitchingTo(null);
  };

  const removeAccount = (accountId: string) => {
    const account = storage.accounts[accountId];
    if (!account) return;

    const accountName = account.username;

    showConfirmationAlert({
      title: "Remover Conta",
      content: `Tem certeza que deseja remover ${accountName} da lista?`,
      confirmText: "Remover",
      cancelText: "Cancelar",
      confirmColor: "brand",
      onConfirm: () => {
        delete storage.accounts[accountId];
        storage.accountOrder = storage.accountOrder.filter((id: string) => id !== accountId);
        showToast(`${accountName} removida`);
      }
    });
  };

  const addCurrentAccount = async () => {
    setIsAdding(true);
    try {
      const token = TokenManager.getToken();
      const currentUser = UserStore.getCurrentUser();

      if (!currentUser) {
        showToast("Erro ao obter usuário atual");
        setIsAdding(false);
        return;
      }

      if (storage.accounts[currentUser.id]) {
        showToast("Conta atual já está salva");
        setIsAdding(false);
        return;
      }

      storage.accounts[currentUser.id] = {
        id: currentUser.id,
        username: currentUser.username,
        discriminator: currentUser.discriminator,
        avatar: currentUser.avatar,
        displayName: currentUser.globalName || currentUser.username,
        token: token,
        addedAt: Date.now()
      };

      if (!storage.accountOrder.includes(currentUser.id)) {
        storage.accountOrder.push(currentUser.id);
      }

      setShowAddDialog(false);
      showToast(`${currentUser.username} adicionada!`);
    } catch (e: any) {
      console.error("Erro ao adicionar conta:", e);
      showToast("Falha ao adicionar conta atual");
    }
    setIsAdding(false);
  };

  const addWithCredentials = async () => {
    if (!email.trim() || !password.trim()) {
      showToast("Preencha e-mail e senha");
      return;
    }

    setIsAdding(true);
    try {
      const response = await fetch("https://discord.com/api/v9/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: JSON.stringify({
          login: email.trim(),
          password: password.trim()
        })
      });

      const loginData = await response.json();

      if (!response.ok || !loginData.token) {
        let msg = "Falha no login";
        if (loginData.captcha_key) msg = "Captcha necessário - faça login pelo Discord primeiro";
        else if (loginData.message) {
          const m = loginData.message.toLowerCase();
          if (m.includes('invalid')) msg = "E-mail ou senha inválidos";
          else if (m.includes('rate limit')) msg = "Muitas tentativas - aguarde";
          else if (m.includes('mfa') || m.includes('2fa')) msg = "Contas com 2FA não suportadas por credenciais";
          else msg = "Falha no login - verifique suas credenciais";
        } else if (response.status === 429) msg = "Muitas tentativas - aguarde";
        showToast(msg);
        setIsAdding(false);
        return;
      }

      const userResponse = await fetch("https://discord.com/api/v9/users/@me", {
        headers: { "Authorization": loginData.token }
      });

      if (!userResponse.ok) {
        showToast("Login OK mas falha ao obter dados do usuário");
        setIsAdding(false);
        return;
      }

      const user = await userResponse.json();

      if (storage.accounts[user.id]) {
        showToast(`${user.username} já está salva`);
        setIsAdding(false);
        return;
      }

      storage.accounts[user.id] = {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        displayName: user.global_name || user.username,
        token: loginData.token,
        addedAt: Date.now()
      };

      if (!storage.accountOrder.includes(user.id)) {
        storage.accountOrder.push(user.id);
      }

      setEmail("");
      setPassword("");
      setShowAddDialog(false);
      showToast(`${user.username} adicionada!`);
    } catch (e: any) {
      console.error("Erro no login:", e);
      let msg = "Falha no login";
      if (e.message.includes('network') || e.message.includes('fetch')) msg = "Erro de rede - verifique a conexão";
      showToast(msg);
    }
    setIsAdding(false);
  };

  // Tela de adicionar conta
  if (showAddDialog) {
    return React.createElement(ReactNative.View, {
      style: { flex: 1, backgroundColor: '#2f3136' }
    }, [
      React.createElement(ReactNative.View, {
        key: "header",
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#202225',
          borderBottomWidth: 1,
          borderBottomColor: '#40444b'
        }
      }, [
        React.createElement(ReactNative.TouchableOpacity, {
          key: "back",
          onPress: () => { setShowAddDialog(false); setEmail(""); setPassword(""); },
          style: { marginRight: 16 }
        }, React.createElement(ReactNative.Text, {
          style: { color: '#7289da', fontSize: 16 }
        }, "← Voltar")),
        React.createElement(ReactNative.Text, {
          key: "title",
          style: { color: 'white', fontSize: 18, fontWeight: 'bold' }
        }, "Adicionar Conta")
      ]),

      React.createElement(ReactNative.ScrollView, {
        key: "content",
        style: { flex: 1 },
        contentContainerStyle: { padding: 16, paddingBottom: 100 }
      }, [
        React.createElement(ReactNative.Text, {
          key: "info",
          style: { color: '#b9bbbe', fontSize: 16, marginBottom: 20, textAlign: 'center' }
        }, "Insira as credenciais da sua conta Discord ou adicione a conta atual"),

        React.createElement(ReactNative.TextInput, {
          key: "email",
          placeholder: "Endereço de e-mail",
          placeholderTextColor: '#72767d',
          value: email,
          onChangeText: setEmail,
          keyboardType: "email-address",
          autoCapitalize: "none",
          style: {
            backgroundColor: '#40444b',
            color: 'white',
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 16
          }
        }),

        React.createElement(ReactNative.TextInput, {
          key: "password",
          placeholder: "Senha",
          placeholderTextColor: '#72767d',
          value: password,
          onChangeText: setPassword,
          secureTextEntry: true,
          style: {
            backgroundColor: '#40444b',
            color: 'white',
            padding: 16,
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 16
          }
        }),

        React.createElement(ReactNative.TouchableOpacity, {
          key: "login-btn",
          onPress: addWithCredentials,
          disabled: isAdding,
          style: {
            backgroundColor: isAdding ? '#5c6bc0' : '#7289da',
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 12,
            opacity: isAdding ? 0.6 : 1
          }
        }, React.createElement(ReactNative.Text, {
          style: { color: 'white', fontSize: 18, fontWeight: 'bold' }
        }, isAdding ? "Adicionando..." : "Adicionar com E-mail e Senha")),

        React.createElement(ReactNative.View, {
          key: "divider",
          style: { height: 1, backgroundColor: '#40444b', marginVertical: 16 }
        }),

        React.createElement(ReactNative.TouchableOpacity, {
          key: "current-btn",
          onPress: addCurrentAccount,
          disabled: isAdding,
          style: {
            backgroundColor: isAdding ? '#5c6bc0' : '#43b581',
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            opacity: isAdding ? 0.6 : 1
          }
        }, React.createElement(ReactNative.Text, {
          style: { color: 'white', fontSize: 18, fontWeight: 'bold' }
        }, isAdding ? "Adicionando..." : "Adicionar Conta Atual"))
      ])
    ]);
  }

  // Tela principal - lista de contas
  return React.createElement(ReactNative.View, {
    style: { flex: 1, backgroundColor: '#2f3136' }
  }, [
    React.createElement(ReactNative.View, {
      key: "header",
      style: {
        padding: 16,
        backgroundColor: '#202225',
        borderBottomWidth: 1,
        borderBottomColor: '#40444b'
      }
    }, React.createElement(ReactNative.Text, {
      style: { color: 'white', fontSize: 20, fontWeight: 'bold' }
    }, "Trocar de Conta")),

    React.createElement(ReactNative.View, {
      key: "accounts-section",
      style: { flex: 1, padding: 16 }
    }, [
      React.createElement(ReactNative.Text, {
        key: "section-title",
        style: { color: '#b9bbbe', fontSize: 14, fontWeight: 'bold', marginBottom: 12 }
      }, `CONTAS SALVAS (${orderedAccounts.length})`),

      orderedAccounts.length === 0
        ? React.createElement(ReactNative.View, {
            key: "empty",
            style: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }
          }, [
            React.createElement(ReactNative.Text, {
              key: "empty-text",
              style: { color: '#72767d', fontSize: 16, marginBottom: 8 }
            }, "Nenhuma conta salva"),
            React.createElement(ReactNative.Text, {
              key: "empty-hint",
              style: { color: '#72767d', fontSize: 14, textAlign: 'center' }
            }, "Toque no botão + abaixo para adicionar sua conta atual ou entrar com credenciais.")
          ])
        : React.createElement(ReactNative.ScrollView, {
            key: "accounts-scroll",
            style: { flex: 1 },
            contentContainerStyle: { paddingBottom: 100 }
          }, orderedAccounts.map((account: any, index: number) => {
            const isCurrent = account.id === currentUserId;
            const isSwitching = switchingTo === account.id;

            let avatarUrl = "https://cdn.discordapp.com/embed/avatars/1.png";
            if (account.avatar) {
              avatarUrl = `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png?size=48`;
            }

            return React.createElement(ReactNative.View, {
              key: account.id,
              style: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isCurrent ? '#7289da20' : '#36393f',
                borderWidth: isCurrent ? 2 : 0,
                borderColor: '#7289da',
                borderRadius: 12,
                padding: 12,
                marginBottom: 12
              }
            }, [
              React.createElement(ReactNative.TouchableOpacity, {
                key: "avatar",
                onPress: () => switchToAccount(account.id),
                disabled: isCurrent || isSwitching,
                style: { marginRight: 12 }
              }, React.createElement(ReactNative.Image, {
                source: { uri: avatarUrl },
                style: {
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  opacity: (isCurrent || isSwitching) ? 0.7 : 1
                }
              })),

              React.createElement(ReactNative.View, {
                key: "info",
                style: { flex: 1 }
              }, [
                React.createElement(ReactNative.Text, {
                  key: "name",
                  style: { color: 'white', fontSize: 16, fontWeight: 'bold' }
                }, `${index + 1}. ${account.displayName || account.username}`),
                React.createElement(ReactNative.Text, {
                  key: "status",
                  style: {
                    color: isCurrent ? '#43b581' : '#72767d',
                    fontSize: 12,
                    marginTop: 2
                  }
                }, isCurrent ? "✓ Conta Atual"
                  : isSwitching ? "Trocando..."
                  : "Toque no avatar para trocar"),
                React.createElement(ReactNative.Text, {
                  key: "date",
                  style: { color: '#72767d', fontSize: 11, marginTop: 2 }
                }, `Adicionada: ${formatDate(account.addedAt || Date.now())}`)
              ]),

              React.createElement(ReactNative.TouchableOpacity, {
                key: "remove",
                onPress: () => removeAccount(account.id),
                style: {
                  backgroundColor: '#f04747',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  minWidth: 80,
                  alignItems: 'center'
                }
              }, React.createElement(ReactNative.Text, {
                style: { color: 'white', fontSize: 12, fontWeight: 'bold' }
              }, "Remover"))
            ]);
          }))
    ]),

    React.createElement(ReactNative.View, {
      key: "bottom",
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#202225',
        borderTopWidth: 1,
        borderTopColor: '#40444b',
        paddingVertical: 12,
        paddingHorizontal: 16,
        paddingBottom: 40
      }
    }, React.createElement(ReactNative.TouchableOpacity, {
      key: "add",
      onPress: () => setShowAddDialog(true),
      style: {
        backgroundColor: '#7289da',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }
    }, [
      React.createElement(ReactNative.Text, {
        key: "icon",
        style: { color: 'white', fontSize: 20, marginRight: 8 }
      }, "+"),
      React.createElement(ReactNative.Text, {
        key: "text",
        style: { color: 'white', fontSize: 18, fontWeight: 'bold' }
      }, "Adicionar Conta")
    ]))
  ]);
}
