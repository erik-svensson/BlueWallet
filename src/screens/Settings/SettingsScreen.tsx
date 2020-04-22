import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { images, icons } from 'app/assets';
import { Image, ScreenTemplate, Header, ListItem } from 'app/components';
import { en } from 'app/locale';

import { LabeledSettingsRow } from './LabeledSettingsRow';

export const SettingsScreen = () => {
  const renderGeneralSettings = () => (
    <>
      <ListItem title={en.settings.language} source={icons.languageIcon} />
      <ListItem title={en.settings.electrumServer} source={icons.dataUsageIcon} />
      <ListItem
        title={en.settings.advancedOptions}
        source={icons.buildIcon}
        switchValue={false}
        onSwitchValueChange={() => null}
        iconHeight={21}
        iconWidth={20}
      />
    </>
  );

  const renderSecuritySettings = () => (
    <>
      <ListItem title={en.settings.changePin} source={icons.lockIcon} iconWidth={15} iconHeight={20} />
      <ListItem
        title={en.settings.fingerprintLogin}
        source={icons.fingerprintIcon}
        switchValue={true}
        onSwitchValueChange={() => null}
        iconWidth={17}
        iconHeight={19}
      />
    </>
  );

  const renderAboutSettings = () => <ListItem title={en.settings.aboutUs} source={icons.infoIcon} />;

  return (
    <ScreenTemplate>
      <Image source={images.goldWalletLogoBlack} style={styles.logo} resizeMode="contain" />
      <LabeledSettingsRow label={en.settings.general}>{renderGeneralSettings()}</LabeledSettingsRow>
      <LabeledSettingsRow label={en.settings.security}>{renderSecuritySettings()}</LabeledSettingsRow>
      <LabeledSettingsRow label={en.settings.about}>{renderAboutSettings()}</LabeledSettingsRow>
    </ScreenTemplate>
  );
};

SettingsScreen.navigationOptions = (props: NavigationScreenProps) => ({
  header: <Header navigation={props.navigation} title={en.settings.header} />,
});

const styles = StyleSheet.create({
  logo: {
    height: 82,
    width: '100%',
    paddingTop: 3,
  },
});
