import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './src/ThemeProvider';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AccountProvider, useAccount } from './src/contexts/AccountContext';
import { apiService } from './src/services/api';
import { useTheme } from './src/ThemeProvider';

type AccountType = 'client' | 'admin';

const AccountSelector: React.FC = () => {
  const { colors } = useTheme();
  const { accountType, setAccountType } = useAccount();
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (type: AccountType) => {
    setAccountType(type);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.accountButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setShowModal(true)}
      >
        <Ionicons name="person-circle" size={20} color={colors.primary} />
        <Text style={[styles.accountButtonText, { color: colors.foreground }]}>
          {accountType === 'client' ? 'Client Account' : 'Admin Account'}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.mutedForeground} />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              Select Account Type
            </Text>
            
            <TouchableOpacity
              style={[
                styles.accountOption,
                { backgroundColor: accountType === 'client' ? colors.primary + '20' : 'transparent' }
              ]}
              onPress={() => handleSelect('client')}
            >
              <Ionicons 
                name="person" 
                size={24} 
                color={accountType === 'client' ? colors.primary : colors.mutedForeground} 
              />
              <View style={styles.accountOptionText}>
                <Text style={[styles.accountOptionTitle, { color: colors.foreground }]}>
                  Client Account
                </Text>
                <Text style={[styles.accountOptionSubtitle, { color: colors.mutedForeground }]}>
                  Access workouts, book sessions, track progress
                </Text>
              </View>
              {accountType === 'client' && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.accountOption,
                { backgroundColor: accountType === 'admin' ? colors.primary + '20' : 'transparent' }
              ]}
              onPress={() => handleSelect('admin')}
            >
              <Ionicons 
                name="people" 
                size={24} 
                color={accountType === 'admin' ? colors.primary : colors.mutedForeground} 
              />
              <View style={styles.accountOptionText}>
                <Text style={[styles.accountOptionTitle, { color: colors.foreground }]}>
                  Admin Account
                </Text>
                <Text style={[styles.accountOptionSubtitle, { color: colors.mutedForeground }]}>
                  Manage clients, view calendar, approve bookings
                </Text>
              </View>
              {accountType === 'admin' && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: colors.muted }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={[styles.cancelButtonText, { color: colors.foreground }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const AppContent: React.FC = () => {
  const { accountType } = useAccount();

  useEffect(() => {
    apiService.testConnection().then((isConnected) => {
      if (isConnected) {
        console.log('🎉 API connection established!');
      } else {
        console.log('⚠️ Could not connect to API');
        Alert.alert(
          'Connection Warning',
          'Could not connect to the backend server. Please check if the server is running.',
          [{ text: 'OK' }]
        );
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AccountSelector />
      <AppNavigator accountType={accountType} />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <AccountProvider>
          <AppContent />
        </AccountProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 50,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accountButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  accountOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  accountOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  accountOptionSubtitle: {
    fontSize: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
