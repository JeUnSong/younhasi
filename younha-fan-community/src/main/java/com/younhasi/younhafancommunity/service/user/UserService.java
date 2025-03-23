package com.younhasi.younhafancommunity.service.user;

import com.younhasi.younhafancommunity.dto.user.UserLoginRequest;
import com.younhasi.younhafancommunity.dto.user.UserLoginResponse;
import com.younhasi.younhafancommunity.dto.user.UserSignupRequest;
import com.younhasi.younhafancommunity.dto.user.UserSignupResponse;

public interface UserService {

    UserSignupResponse signup(UserSignupRequest request);

    UserLoginResponse login(UserLoginRequest request);
}