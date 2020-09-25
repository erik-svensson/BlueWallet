package io.goldwallet.wallet;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // TODO: Add source using env var
        // String splashSrc = "@mipmap/splash"
        // if (BuildConfig.IS_BETA === "1") {
        //     splashSrc = ""
        // }
        // String splash = getResources().getString(R.string.splash, splashSrc);

        SplashScreen.show(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "GoldWallet";
    }
}
