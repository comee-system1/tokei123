<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle",realm.name)}
    <#elseif section = "header">
        ${msg("loginTitleHtml",realm.name)}
    <#elseif section = "form">
        <h2>${msg("doForgotPasswordRenew")}</h2>
        <ul id="forgetNavi">
            <li class="after">&nbsp;</li>
            <li class="active">&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
        </ul>
        
${auth.getAttemptedUsername()}
<#assign calculation = auth.getAuthenticationSelections()>

<#if calculation?is_sequence>
  <#list calculation as c>
    ${c}
  </#list>
<#elseif calculation?is_hash_ex>
  <#list calculation?keys as key>
    ${key} - ${calculation[key]}
  </#list>
<#elseif calculation?is_string>
  ${calculation}
</#if>




        <p>${msg("secretAnswerInput")}</p>
        <form id="kc-totp-login-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="totp" class="${properties.kcLabelClass!}">What is your mom's first name</label>
                </div>
                
                <div class="${properties.kcInputWrapperClass!}">
                    <input id="totp" name="secret_answer" type="text" class="${properties.kcInputClass!}" />
                </div>
            </div>
            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                    </div>
                </div>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">

                    <ul id="forgetButton">
                        <li class="max">
                            <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                            <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                               name="login" type="submit" value="${msg("doNext")}"/>
                        </li>
                    </ul>


                    <#--  <div class="${properties.kcFormButtonsWrapperClass!}">
                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                               name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                    </div>  -->
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>