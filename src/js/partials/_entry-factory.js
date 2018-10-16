var oliviaEntryFactory = function() {
    var oliviaEntry = {
        entryStickySidebar: null,
        isInitiated: false,
        initSidebar: function() {
            if (!this.isInitiated) {
                this.initSidebarCounter();
                this.isInitiated = true;
            }
        },
        isRadioButtonField: function(field) {
            return field.is(':radio');
        },
        isCheckboxField: function(field) {
            return field.is(':checkbox');
        },
        checkboxFieldHasValue: function(checkboxSelector, fieldContainer) {
            return $(checkboxSelector, fieldContainer).is(':checked');
        },
        radioButtonFieldHasValue: function(radioSelector, fieldContainer) {
            return $(radioSelector, fieldContainer).is(':checked');
        },
        textareaFieldHasValue: function(textareaSelector, fieldContainer) {
            return $(textareaSelector, fieldContainer).val() != '';
        },
        textInputFieldHasValue: function(textSelector, fieldContainer) {
            return $(textSelector, fieldContainer).val() != '';
        },
        isFieldFilled: function(fieldContainer) {
            // check if field is filled.
            // filled field highlighted with gray background.
            return fieldContainer.hasClass('field-is-filled');
        },
        isDisplayOnlyField: function(fieldContainer) {
            return fieldContainer.hasClass('display-only-field');
        },
        isNoConnectionField: function(fieldContainer) {
            return fieldContainer.hasClass('no-connection');
        },
        isSatisfiedField: function(fieldContainer) {
            return fieldContainer.hasClass('satisfied-connection');
        },
        isNotSatisfiedField: function(fieldContainer) {
            return fieldContainer.hasClass('not-satisfied-connection');
        },
        isConnectorField: function(fieldContainer) {
            return fieldContainer.hasClass('connector-field');
        },
        isFieldExistInContainer: function(fieldSelector, fieldContainer) {
            // field exist in form_bl container
            return $(fieldSelector, fieldContainer).length != 0
        },
        markFieldAsFilled: function(fieldContainer) {
            // add gray background to field container
            fieldContainer.addClass('field-is-filled');
            return true
        },
        markFieldAsUnFilled: function(fieldContainer) {
            // remove gray background from field container
            fieldContainer.removeClass('field-is-filled');
            return true
        },
        getFilledFieldsCount: function() {
            // get count of filled fields
            return parseInt($('.filled-count').data('filledCount'));
        },
        getAllFieldsCount: function() {
            // get count of all fields
            return parseInt($('.all-fields-count').data('allFieldsCount'));
        },
        incrementFilledCounter: function() {
            // increment counter when field was filled
            var filledCount = this.getFilledFieldsCount();
            var allFieldsCount = this.getAllFieldsCount();
            this.updateSidebarTitleCount(filledCount + 1, allFieldsCount);
            return true
        },
        decrementFilledCounter: function() {
            // decrement counter when field was unfilled
            var filledCount = this.getFilledFieldsCount();
            var allFieldsCount = this.getAllFieldsCount();
            this.updateSidebarTitleCount(filledCount - 1, allFieldsCount);
            return true
        },
        updateFieldOnChange: function(fieldContainer, fieldSelector) {
            var oliviaEntryObj = this

            $(fieldSelector, fieldContainer).change(function() {
                var field = $(this),
                    value = field.val();

                // always update sidebar if connector field value has been changed
                if (oliviaEntryObj.isConnectorField(fieldContainer)) {
                    oliviaEntryObj.initSidebarCounter();
                    return
                }

                // decrement filled counter fields for not satisfied fields
                if (oliviaEntryObj.isNotSatisfiedField(fieldContainer)) {
                    oliviaEntryObj.decrementFilledCounter();
                    return
                }

                // check if checkbox field does not have checked values
                if (oliviaEntryObj.isCheckboxField(field) && !oliviaEntryObj.checkboxFieldHasValue(fieldSelector, fieldContainer) && oliviaEntryObj.isFieldFilled(fieldContainer)) {
                    oliviaEntryObj.markFieldAsUnFilled($(this).parents('.form__bl'));
                    oliviaEntryObj.decrementFilledCounter();
                    return
                };

                if (value == '') {
                    oliviaEntryObj.markFieldAsUnFilled($(this).parents('.form__bl'));
                    oliviaEntryObj.decrementFilledCounter();
                    return
                };

                // do not increment counter if "onchange" event has been triggered but field already filled
                if (value != '' && !oliviaEntryObj.isFieldFilled(fieldContainer)) {
                    oliviaEntryObj.markFieldAsFilled($(this).parents('.form__bl'));
                    oliviaEntryObj.incrementFilledCounter();
                    return
                };
            });
        },
        updateSidebarTitleCount: function(fieldsFilledCount, fieldsCount) {
            // update counters in sidebar title on filled/unfilled events

            var sidebarTitle = $('.form__steps'),
                // prepare sidebar counters
                countTitle = '<span class="form__steps">(<span class="filled-count">' + fieldsFilledCount + '</span>/<span class="all-fields-count">' + fieldsCount + '</span>)</span>';

            // write sidebar title with updated fields counters
            sidebarTitle.replaceWith(countTitle);
            // set data attribute to filled counter element
            $('.filled-count').data('filledCount', fieldsFilledCount);
            // set data attribute to all fields counter element
            $('.all-fields-count').data('allFieldsCount', fieldsCount);
        },
        initSidebarCounter: function() {
            var oliviaEntryObj = this,
                checkboxSelector = 'input[type="checkbox"]',
                radioSelector = 'input[type="radio"]',
                textSelector = 'input[type="text"]',
                textareaSelector = 'textarea',
                fieldsCount = 0,
                fieldsFilledCount = 0;

            $('.js-entry-sidebar .form__bl').each(function() {
                var $fieldContainer = $(this),
                    label = $('.form__subttl', $fieldContainer),
                    fieldNumberContainer = $('.field-number', $fieldContainer);

                // skip display only fields
                if (oliviaEntryObj.isDisplayOnlyField($fieldContainer)) {
                    return;
                }

                if (oliviaEntryObj.isNoConnectionField($fieldContainer) || oliviaEntryObj.isSatisfiedField($fieldContainer)) {
                    fieldsCount++;
                }

                if (fieldNumberContainer.length) {
                    fieldNumberContainer.remove();
                };
                label.prepend('<span class="field-number"></span>');
                fieldNumberText = fieldsCount + '. '
                $('.field-number', $fieldContainer).text(fieldNumberText)

                // check if the field is checkbox
                if (oliviaEntryObj.isFieldExistInContainer(checkboxSelector, $fieldContainer)) {
                    // check if checkbox has value. if true we mark container as filled
                    if (oliviaEntryObj.checkboxFieldHasValue(checkboxSelector, $fieldContainer) && (oliviaEntryObj.isNoConnectionField($fieldContainer) || oliviaEntryObj.isSatisfiedField($fieldContainer))) {
                        fieldsFilledCount++;
                        oliviaEntryObj.markFieldAsFilled($fieldContainer);
                    }
                    // subscribe on checkbox value changes
                    if (!oliviaEntryObj.isInitiated) {
                        oliviaEntryObj.updateFieldOnChange($fieldContainer, checkboxSelector);
                    }
                    return;
                }

                // check if the field is radio button
                if (oliviaEntryObj.isFieldExistInContainer(radioSelector, $fieldContainer)) {
                    // check if radio button has value. if true we mark container as filled
                    if (oliviaEntryObj.radioButtonFieldHasValue(radioSelector, $fieldContainer) && (oliviaEntryObj.isNoConnectionField($fieldContainer) || oliviaEntryObj.isSatisfiedField($fieldContainer))) {
                        fieldsFilledCount++;
                        oliviaEntryObj.markFieldAsFilled($fieldContainer);
                    }
                    // subscribe on radio button value changes
                    if (!oliviaEntryObj.isInitiated) {
                        oliviaEntryObj.updateFieldOnChange($fieldContainer, radioSelector);
                    }
                    return;
                }

                // check if the field is textarea
                if (oliviaEntryObj.isFieldExistInContainer(textareaSelector, $fieldContainer)) {
                    // check if textarea has value. if true we mark container as filled
                    if (oliviaEntryObj.textareaFieldHasValue(textareaSelector, $fieldContainer) && (oliviaEntryObj.isNoConnectionField($fieldContainer) || oliviaEntryObj.isSatisfiedField($fieldContainer))) {
                        fieldsFilledCount++;
                        oliviaEntryObj.markFieldAsFilled($fieldContainer);
                    }
                    // subscribe on textarea value changes
                    if (!oliviaEntryObj.isInitiated) {
                        oliviaEntryObj.updateFieldOnChange($fieldContainer, textareaSelector);
                    }
                    return;
                }

                // check if the field is text input
                if (oliviaEntryObj.isFieldExistInContainer(textSelector, $fieldContainer)) {
                    // check if text input has value. if true we mark container as filled
                    if (oliviaEntryObj.textInputFieldHasValue(textSelector, $fieldContainer) && (oliviaEntryObj.isNoConnectionField($fieldContainer) || oliviaEntryObj.isSatisfiedField($fieldContainer))) {
                        fieldsFilledCount++;
                        oliviaEntryObj.markFieldAsFilled($fieldContainer);
                    }
                    // subscribe on text input value changes
                    if (!oliviaEntryObj.isInitiated) {
                        oliviaEntryObj.updateFieldOnChange($fieldContainer, textSelector);
                    }
                    return;
                }

                // if this rule executed, it means that entry in finalized status and we need only to calculate filled fields.
                if (oliviaEntryObj.isFieldFilled($fieldContainer)) {
                    fieldsFilledCount++;
                }

            });
            oliviaEntryObj.updateSidebarTitleCount(fieldsFilledCount, fieldsCount);
        },
    }
    return oliviaEntry;
};

window.oliviaEntryFactory = oliviaEntryFactory;