<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','email','firstName','lastName'); section>
    <#if section = "header">
        ${msg("loginProfileTitle")}
    <#elseif section = "form">
        <form id="kc-update-profile-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <h2>${msg("loginTitleHtml",(realm.displayName!''))}</h2>
            <hr size=1 />
            <h3>${msg("firstLogin")}</h3>

            <ul id="forgetNavi" class="half">
                <li class="after">&nbsp;</li>
                <li class="active" >&nbsp;</li>
                <li>&nbsp;</li>
            </ul>


            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="secretquestion" class="${properties.kcLabelClass!}">${msg("secretQuestion")}</label>
                </div>

                <!--
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="tel" name="user.attributes.secretquestionText" value="${(user.attributes.secretquestionText!'')}" />
                </div>
                -->
                <select name="user.attributes.secretquestionText" id="secretquestion" >
                    <option value="testと入力してください">testと入力してください</option>
                    <option value="所属している会社名は何ですか？">所属している会社名は何ですか？</option>
                </select>
            </div>

            <input type="hidden" id="username" name="username" value="${(user.username!'')}" />
            <input type="hidden" id="email" name="email" value="${(user.email!'')}" />
            <input type="hidden" id="firstName" name="firstName" value="${(user.firstName!'')}" />
            <input type="hidden" id="lastName" name="lastName" value="${(user.lastName!'')}" />
            <#--  <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="secretanswer" class="${properties.kcLabelClass!}">${msg("secretAnswer")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="secretanswer" name="user.attributes.secretanswer" value="" />
                </div>
            </div>  -->



            <#--  <#if user.editUsernameAllowed>
                <div class="${properties.kcFormGroupClass!}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input type="text" id="username" name="username" value="${(user.username!'')}"
                               class="${properties.kcInputClass!}"
                               aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                        />

                        <#if messagesPerField.existsError('username')>
                            <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>
            </#if>
            <#if user.editEmailAllowed>
                <div class="${properties.kcFormGroupClass!}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input type="text" id="email" name="email" value="${(user.email!'')}"
                               class="${properties.kcInputClass!}"
                               aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                        />

                        <#if messagesPerField.existsError('email')>
                            <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('email'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>
            </#if>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="firstName" name="firstName" value="${(user.firstName!'')}"
                           class="${properties.kcInputClass!}"
                           aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                    />

                    <#if messagesPerField.existsError('firstName')>
                        <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="lastName" name="lastName" value="${(user.lastName!'')}"
                           class="${properties.kcInputClass!}"
                           aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                    />

                    <#if messagesPerField.existsError('lastName')>
                        <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                        </span>
                    </#if>
                </div>  
            </div> 
            -->
            <hr size=1 class="marginHr"/>
            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                    </div>
                </div>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <#if isAppInitiatedAction??>
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                    <button class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
                    <#else>
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                    </#if>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
