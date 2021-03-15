package com.digitalpricetag;

import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomDeviceInfo extends ReactContextBaseJavaModule {
    public CustomDeviceInfo(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CustomDeviceInfo";
    }

    @ReactMethod
    public void getModel( Promise promise) {
        try {

            String manufacturer = Build.MANUFACTURER;
            String model = Build.MODEL;

            String result = manufacturer + " " + model;
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }




}