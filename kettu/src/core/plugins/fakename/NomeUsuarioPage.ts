import { React, ReactNative } from "@metro/common";
import { findByStoreName } from "@metro";
import { useProxy } from "@core/vendetta/storage";
import { showToast } from "@ui/toasts";

import { fakeNameStorage } from "./storage";

const UserStore = findByStoreName("UserStore");

export default function NomeUsuarioPage() {
  useProxy(fakeNameStorage);

  const currentUser = UserStore.getCurrentUser();
  const realUsername = currentUser?.username || "???";

  const [inputValue, setInputValue] = React.useState(fakeNameStorage.fakeUsername || "");

  const isActive = fakeNameStorage.enabled && !!fakeNameStorage.fakeUsername;

  const aplicar = () => {
    const nome = inputValue.trim();
    if (!nome) {
      showToast("Digite um nome de usuário");
      return;
    }

    if (nome.length < 2) {
      showToast("Nome muito curto (mínimo 2 caracteres)");
      return;
    }

    if (nome.length > 32) {
      showToast("Nome muito longo (máximo 32 caracteres)");
      return;
    }

    fakeNameStorage.fakeUsername = nome;
    fakeNameStorage.enabled = true;
    showToast(`Nome alterado para @${nome}`);
  };

  const remover = () => {
    fakeNameStorage.fakeUsername = "";
    fakeNameStorage.enabled = false;
    setInputValue("");
    showToast("Nome de usuário restaurado");
  };

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
    }, [
      React.createElement(ReactNative.Text, {
        key: "title",
        style: { color: 'white', fontSize: 20, fontWeight: 'bold' }
      }, "Nome de Usuário"),
      React.createElement(ReactNative.Text, {
        key: "subtitle",
        style: { color: '#72767d', fontSize: 13, marginTop: 4 }
      }, "Troque visualmente o seu @username"),
      React.createElement(ReactNative.Text, {
        key: "warning",
        style: { color: '#faa61a', fontSize: 11, marginTop: 4 }
      }, "Visível apenas para você")
    ]),

    React.createElement(ReactNative.ScrollView, {
      key: "content",
      style: { flex: 1 },
      contentContainerStyle: { padding: 16 }
    }, [
      React.createElement(ReactNative.View, {
        key: "current",
        style: {
          backgroundColor: '#36393f',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20
        }
      }, [
        React.createElement(ReactNative.Text, {
          key: "label",
          style: { color: '#72767d', fontSize: 12, fontWeight: 'bold', marginBottom: 8 }
        }, "STATUS ATUAL"),
        React.createElement(ReactNative.View, {
          key: "status-row",
          style: { flexDirection: 'row', alignItems: 'center' }
        }, [
          React.createElement(ReactNative.View, {
            key: "dot",
            style: {
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: isActive ? '#43b581' : '#72767d',
              marginRight: 8
            }
          }),
          React.createElement(ReactNative.Text, {
            key: "status-text",
            style: { color: 'white', fontSize: 15 }
          }, isActive ? `Ativo: @${fakeNameStorage.fakeUsername}` : "Desativado — usando nome real")
        ]),
        React.createElement(ReactNative.Text, {
          key: "real-name",
          style: { color: '#72767d', fontSize: 13, marginTop: 6 }
        }, `Nome real: @${realUsername}`)
      ]),

      React.createElement(ReactNative.Text, {
        key: "input-label",
        style: { color: '#b9bbbe', fontSize: 12, fontWeight: 'bold', marginBottom: 8 }
      }, "NOVO NOME DE USUÁRIO"),

      React.createElement(ReactNative.View, {
        key: "input-row",
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#40444b',
          borderRadius: 8,
          paddingHorizontal: 14,
          marginBottom: 20
        }
      }, [
        React.createElement(ReactNative.Text, {
          key: "at",
          style: { color: '#72767d', fontSize: 18, marginRight: 2 }
        }, "@"),
        React.createElement(ReactNative.TextInput, {
          key: "input",
          placeholder: "nome_de_usuario",
          placeholderTextColor: '#72767d',
          value: inputValue,
          onChangeText: setInputValue,
          autoCapitalize: "none",
          autoCorrect: false,
          maxLength: 32,
          style: {
            flex: 1,
            color: 'white',
            fontSize: 16,
            paddingVertical: 14
          }
        })
      ]),

      React.createElement(ReactNative.TouchableOpacity, {
        key: "apply-btn",
        onPress: aplicar,
        style: {
          backgroundColor: '#7289da',
          paddingVertical: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 12
        }
      }, React.createElement(ReactNative.Text, {
        style: { color: 'white', fontSize: 16, fontWeight: 'bold' }
      }, "Aplicar")),

      isActive
        ? React.createElement(ReactNative.TouchableOpacity, {
            key: "remove-btn",
            onPress: remover,
            style: {
              backgroundColor: '#f04747',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center',
              marginBottom: 20
            }
          }, React.createElement(ReactNative.Text, {
            style: { color: 'white', fontSize: 16, fontWeight: 'bold' }
          }, "Remover e Voltar ao Normal"))
        : null,

      React.createElement(ReactNative.View, {
        key: "info-box",
        style: {
          backgroundColor: '#36393f',
          borderRadius: 12,
          padding: 16,
          marginTop: 8
        }
      }, [
        React.createElement(ReactNative.Text, {
          key: "info-title",
          style: { color: '#b9bbbe', fontSize: 13, fontWeight: 'bold', marginBottom: 6 }
        }, "COMO FUNCIONA"),
        React.createElement(ReactNative.Text, {
          key: "info-text",
          style: { color: '#72767d', fontSize: 13, lineHeight: 20 }
        }, "O nome de usuário será trocado visualmente no seu app. Outras pessoas continuam vendo o seu nome real. A troca é instantânea e persiste entre reinícios do app.")
      ])
    ])
  ]);
}
