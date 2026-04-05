import { React, ReactNative } from "@metro/common";
import { useProxy } from "@core/vendetta/storage";
import { showToast } from "@ui/toasts";

import { badgeStorage } from "./badgeStorage";
import DISCORD_BADGES from "./emblemas";

export default function EmblemasPage() {
  useProxy(badgeStorage);

  const selected = badgeStorage.selectedBadges || [];

  const toggleBadge = (badgeId: string) => {
    const current = [...selected];
    const index = current.indexOf(badgeId);

    if (index >= 0) {
      current.splice(index, 1);
      badgeStorage.selectedBadges = current;

      const badge = DISCORD_BADGES.find(b => b.id === badgeId);
      showToast(`${badge?.name || badgeId} removido`);
    } else {
      current.push(badgeId);
      badgeStorage.selectedBadges = current;

      const badge = DISCORD_BADGES.find(b => b.id === badgeId);
      showToast(`${badge?.name || badgeId} adicionado`);
    }
  };

  const isSelected = (badgeId: string) => selected.includes(badgeId);

  const selectedCount = selected.length;

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
      }, "Emblemas"),
      React.createElement(ReactNative.Text, {
        key: "subtitle",
        style: { color: '#72767d', fontSize: 13, marginTop: 4 }
      }, `Selecione os emblemas que deseja exibir no seu perfil (${selectedCount} selecionados)`),
      React.createElement(ReactNative.Text, {
        key: "warning",
        style: { color: '#faa61a', fontSize: 11, marginTop: 4 }
      }, "Visível apenas para você")
    ]),

    React.createElement(ReactNative.ScrollView, {
      key: "badges-list",
      style: { flex: 1 },
      contentContainerStyle: { padding: 12, paddingBottom: 40 }
    }, DISCORD_BADGES.map((badge) => {
      const active = isSelected(badge.id);

      return React.createElement(ReactNative.TouchableOpacity, {
        key: badge.id,
        onPress: () => toggleBadge(badge.id),
        activeOpacity: 0.7,
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: active ? '#7289da15' : '#36393f',
          borderWidth: active ? 1.5 : 1,
          borderColor: active ? '#7289da' : '#40444b',
          borderRadius: 12,
          padding: 14,
          marginBottom: 8
        }
      }, [
        React.createElement(ReactNative.Image, {
          key: "icon",
          source: { uri: badge.icon },
          style: {
            width: 32,
            height: 32,
            borderRadius: 4,
            marginRight: 14
          }
        }),

        React.createElement(ReactNative.View, {
          key: "text",
          style: { flex: 1 }
        }, [
          React.createElement(ReactNative.Text, {
            key: "name",
            style: {
              color: active ? '#7289da' : 'white',
              fontSize: 15,
              fontWeight: '600'
            }
          }, badge.name),
          React.createElement(ReactNative.Text, {
            key: "desc",
            style: { color: '#72767d', fontSize: 12, marginTop: 2 }
          }, badge.description)
        ]),

        React.createElement(ReactNative.View, {
          key: "toggle",
          style: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: active ? '#7289da' : '#72767d',
            backgroundColor: active ? '#7289da' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10
          }
        }, active
          ? React.createElement(ReactNative.Text, {
              style: { color: 'white', fontSize: 14, fontWeight: 'bold', marginTop: -1 }
            }, "✓")
          : null
        )
      ]);
    }))
  ]);
}
