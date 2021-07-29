var MotorBusca = function (chave, opt) {
    var itjq = $ ? $ : jQuery;
    var boo = typeof (opt) === "boolean" || !opt;
    if (boo) {
        opt = {stMostraCodigo: opt ? opt : false};
    }
    opt = Object.assign({}, {
        stMostraCodigo: false,
        nmDominio: null,
        nmDominioMotor: null,
        stAgencia: false,
        iframe: false,
        target: null,
        queryParams: null
    }, opt);

    var B2C_AGENCIA = typeof AGENCIA !== 'undefined' ? AGENCIA : false;

    var nmDominio = opt.nmDominio;
    var http = '//';
    var stMostraCodigo = opt.stMostraCodigo;
    var url = itjq('script[src*="motorv2.js"]').attr('src');
    var isB2cUpper = url.indexOf('/B2C/motor/motorv2.js') > -1;
    if (!nmDominio) {
        url = url
            .replace('/b2c/resources/js/motorv2.js', '')
            .replace('/b2c/motor/motorv2.js', '')
            .replace('/b2c/public/motor/motorv2.js', '')
            .replace('/B2C/motor/motorv2.js', '')
            .replace('/B2C/public/motor/motorv2.js', '');

        nmDominio = url.replace('http://', '').replace('https://', '').replace('//', '');
        if (nmDominio.indexOf('?') > -1) {
            var ver = nmDominio.substring(nmDominio.indexOf('?'), nmDominio.length);
            nmDominio = nmDominio.replace(ver, '');
        }
        http = url.indexOf('https://') > -1 ? 'https://' : http;
    } else {
        http = nmDominio.indexOf('https://') > -1 ? 'https://' : http;
        nmDominio = nmDominio.replace('http://', '').replace('https://', '').replace('//', '');
    }

    var urlMotorInfotravel = http + nmDominio + "/infotravel/ws/v1/public/";

    if (!opt.nmDominioMotor && !(nmDominio == 'reservas.aviva.com.br' || nmDominio == 'reservas-hml.ctrq.com.br' || nmDominio == '187.72.236.40')) {
        opt.nmDominioMotor = "https://motorv2.infotravel.com.br";
    }

    var urlMotorIntegra = opt.nmDominioMotor + "/integra/api/";

    var pathB2c = isB2cUpper ? "/B2C/" : "/b2c/";

    opt.nmDominioB2C = opt.nmDominioB2C || (http + nmDominio.replace(':8080', '') + pathB2c);
    opt.nmDominioB2C = opt.nmDominioB2C.replace('https://', 'http://').replace('http://', '//');

    if (urlMotorInfotravel.includes('b2c.agenteguru')) {
        urlMotorInfotravel = urlMotorInfotravel.replace('b2c.agenteguru.com.br', 'flot.infotravel.com.br');
    }

    this.opt = opt;

    var SG_IDIOMA = opt.sg_idioma || 'pt_BR';

    const messages = {
        'en_US': {
            fechar: 'Close',
            anterior: 'Prev',
            proximo: 'Next',
            hoje: 'Today',
            janeiro: 'January',
            fevereiro: 'February',
            marco: 'March',
            abril: 'April',
            maio: 'May',
            junho: 'June',
            julho: 'July',
            agosto: 'August',
            setembro: 'September',
            outubro: 'October',
            novembro: 'November',
            dezembro: 'December',
            jan: 'Jan',
            fev: 'Feb',
            mar: 'Mar',
            abr: 'Apr',
            mai: 'May',
            jun: 'Jun',
            jul: 'Jul',
            ago: 'Aug',
            set: 'Sep',
            out: 'Oct',
            nov: 'Nov',
            dez: 'Dec',
            domingo: 'Sunday',
            segunda: 'Monday',
            terca: 'Tuesday',
            quarta: 'Wednesday',
            quinta: 'Thursday',
            sexta: 'Friday',
            sabado: 'Saturday',
            dom: 'Sun',
            seg: 'Mon',
            ter: 'Tue',
            qua: 'Wed',
            qui: 'Thu',
            sex: 'Fri',
            sab: 'Sat',
            anos: 'years',
            ano: 'year',
            noites: 'nights',
            noite: 'night',
            carregando: 'Loading',
            naoDisponivel: 'Not available',
            favorSelecioneORetorno: 'Please select check-out date',
            favorSelecioneODestino: 'Please select destination',
            aereoporto: 'Airport',
            aeroportos: 'Airports',
            destino: 'Destination',
            destinos: 'Destinations',
            hotel: 'Hotel',
            hoteis: 'Hotels',
            municipio: 'City',
            municipios: 'Cities',
            trem: 'Train',
            porto: 'Port',
            nenhumDestinoEncontrado: 'No results found',
            nenhumaOrigemEncontrada: 'No results encontrada',
            selecione: 'Select',
            motorNaoDisponivel: 'Engine not available',
            codigo: 'Code',
        },
        'pt_BR': {
            fechar: 'Fechar',
            anterior: 'Anterior',
            proximo: 'PrÃ³ximo',
            hoje: 'Hoje',
            janeiro: 'Janeiro',
            fevereiro: 'Fevereiro',
            marco: 'MarÃ§o',
            abril: 'Abril',
            maio: 'Maio',
            junho: 'Junho',
            julho: 'Julho',
            agosto: 'Agosto',
            setembro: 'Setembro',
            outubro: 'Outubro',
            novembro: 'Novembro',
            dezembro: 'Dezembro',
            jan: 'Jan',
            fev: 'Fev',
            mar: 'Mar',
            abr: 'Abr',
            mai: 'Mai',
            jun: 'Jun',
            jul: 'Jul',
            ago: 'Ago',
            set: 'Set',
            out: 'Out',
            nov: 'Nov',
            dez: 'Dez',
            domingo: 'Domingo',
            segunda: 'Segunda-feira',
            terca: 'TerÃ§a-feira',
            quarta: 'Quarta-feira',
            quinta: 'Quinta-feira',
            sexta: 'Sexta-feira',
            sabado: 'SÃ¡bado',
            dom: 'Dom',
            seg: 'Seg',
            ter: 'Ter',
            qua: 'Qua',
            qui: 'Qui',
            sex: 'Sex',
            sab: 'Sab',
            anos: 'anos',
            ano: 'ano',
            noites: 'noites',
            noite: 'noite',
            carregando: 'carregando',
            naoDisponivel: 'NÃ£o disponÃ­vel',
            favorSelecioneORetorno: 'Favor selecione a retorno',
            favorSelecioneODestino: 'Favor selecione a retorno',
            aereoporto: 'Aereoporto',
            aeroportos: 'Aeroporto',
            destino: 'Destino',
            destinos: 'Destinos',
            hotel: 'Hotel',
            hoteis: 'Hoteis',
            municipio: 'Municipio',
            municipios: 'Municipios',
            trem: 'Trem',
            porto: 'Porto',
            nenhumDestinoEncontrado: 'Nenhum destino encontrado',
            nenhumaOrigemEncontrada: 'Nenhuma origem encontrada',
            selecione: 'Selecione',
            motorNaoDisponivel: 'motor nÃ£o disponÃ­vel',
            codigo: 'CÃ³digo',
        }
    };

    const ___ = function (msg) {
        var message = messages[SG_IDIOMA][msg] || undefined;

        if (message) {
            return message;
        }

        return '??' + msg + '??';
    };


    itjq.datepicker.regional['pt-BR'] = {
        closeText: ___('fechar'),
        prevText: ___('anterior'),
        nextText: ___('proximo'),
        currentText: ___('hoje'),
        monthNames: [___('janeiro'), ___('fevereiro'), ___('marco'), ___('abril'), ___('maio'), ___('junho'), ___('julho'), ___('agosto'), ___('setembro'), ___('outubro'), ___('novembro'), ___('dezembro')],
        monthNamesShort: [___('jan'), ___('fev'), ___('mar'), ___('abr'), ___('mai'), ___('jun'), ___('jul'), ___('ago'), ___('set'), ___('out'), ___('nov'), ___('dez')],
        dayNames: [___('domingo'), ___('segunda'), ___('terca'), ___('quarta'), ___('quinta'), ___('sexta'), ___('sabado')],
        dayNamesShort: [___('dom'), ___('seg'), ___('ter'), ___('qua'), ___('qui'), ___('sex'), ___('sab')],
        dayNamesMin: [___('dom'), ___('seg'), ___('ter'), ___('qua'), ___('qui'), ___('sex'), ___('sab')],
        weekHeader: 'Sm',
        dateFormat: SG_IDIOMA === 'en_US' ? 'mm/dd/yy' : 'dd/mm/yy',
        showButtonPanel: false,
        showMonthAfterYear: false,
        hideIfNoPrevNext: true,
        yearSuffix: ''
    };

    function configQuartoJson(value, layoutBusca) {
        var itemListSplit = value.split('!');
        var dsItem = '';
        for (let i = 0; i < itemListSplit.length; i++) {
            let itemSplit = itemListSplit[i].split('-');
            let adt = 0;
            let dsSnr = '';
            let dsChd = '';
            for (let ia = 0; ia < itemSplit.length; ia++) {
                if (ia == 0) {
                    adt = itemSplit[ia];
                } else if (itemSplit[ia] >= layoutBusca.qtIdadeMinSnr) {
                    dsSnr += ',' + itemSplit[ia];
                } else {
                    dsChd += ',' + itemSplit[ia];
                }
            }
            dsItem += ',{"adt": ' + adt + (dsSnr.length > 0 ? ', "snr": [' + dsSnr.substr(1) + ']' : '') + (dsChd.length > 0 ? ', "chd": [' + dsChd.substr(1) + ']' : '') + '}';
        }
        return JSON.parse('[' + dsItem.substr(1) + ']');
    }

    function configQuarto(id, layoutBusca, opt) {
        var idQuartoConfig = id.find('.quartoConfig');
        idQuartoConfig.hide();
        var quartoSel = id.find('.quartoQt select');
        var quartoItems = itjq(id).find('.quartoItems');
        var templateQuartoItem = quartoItems.html();
        layoutBusca.qtIdadeMinSnr = layoutBusca.qtIdadeMinSnr ? layoutBusca.qtIdadeMinSnr : 60;
        var quartoConfig = null;
        if (itjq(idQuartoConfig).length > 0 && opt && opt.quarto && opt.quarto.value) {
            if (!idQuartoConfig.val()) {
                idQuartoConfig.val(opt.quarto.value);
            }
            quartoConfig = configQuartoJson(idQuartoConfig.val(), layoutBusca);
        } else {
            quartoConfig = [{"adt": 2}];
        }
        quartoItems.find('.quartoItem').remove();

        if (itjq(quartoSel).length > 0) {
            for (var i = 1; i <= layoutBusca.qtUh; i++) {
                quartoSel.append(itjq('<option>', {value: i, text: i}));
            }
            quartoSel.val(quartoConfig.length);
        } else {
            quartoSel = null;
        }

        function fncQuartoItem(id) {
            quartoItems.html('');
            var count = id == null || !itjq(id).val() ? 1 : itjq(id).val();
            for (var i = 1; i <= count; i++) {
                var item = itjq(templateQuartoItem);
                if (id != null) {
                    var label = item.find('>label');
                    label.html(label.text() + (itjq(id).val() > 1 ? i : ''));
                }
                item.addClass('it-qi' + i);
                fncAdt(item);
                fncChd(item);
                fncSnr(item);
                quartoItems.append(item);
            }
        }

        function fncAdt(id) {
            var sel = id.find('.quartoAdt select');
            for (var i = (layoutBusca.stMelhorIdade ? 0 : 1); i <= layoutBusca.qtAdtMax; i++) {
                sel.append(itjq('<option>', {value: i, text: i}));
            }
            var qt = 2
            if (quartoConfig) {
                var dsClass = id.attr('class').substr(id.attr('class').indexOf('it-qi'));
                var idx = parseInt(dsClass.substring(0, dsClass.indexOf(' ') > 0 ? dsClass.indexOf(' ') : dsClass.length).replace('it-qi', '')) - 1;
                if (quartoConfig.length >= idx) {
                    if (quartoConfig[idx] && (quartoConfig[idx].adt || quartoConfig[idx].adt === 0)) {
                        qt = quartoConfig[idx].adt;
                    }
                }
            }
            sel.val(qt);

            sel.change(function () {
                fncSnr(id);
            });
        }

        function fncChd(id) {
            var sel = id.find('.quartoChd select');
            for (var i = 0; i <= layoutBusca.qtChdMax; i++) {
                sel.append(itjq('<option>', {value: i, text: i}));
            }
            var quartoIdadeSel = id.find('.quartoIdade .quartoIdadeSel');
            var template = quartoIdadeSel[0].outerHTML;
            sel.change(function () {
                fncIdadeChd(this, template);
            });
            var qt = 0;
            if (quartoConfig) {
                var dsClass = id.attr('class').substr(id.attr('class').indexOf('it-qi'));
                var idx = parseInt(dsClass.substring(0, dsClass.indexOf(' ') > 0 ? dsClass.indexOf(' ') : dsClass.length).replace('it-qi', '')) - 1;
                if (quartoConfig.length >= idx) {
                    if (quartoConfig[idx] && quartoConfig[idx].chd) {
                        qt = quartoConfig[idx].chd.length;
                    }
                }
            }
            sel.val(qt);
            fncIdadeChd(sel, template);
        }

        function fncIdadeChd(id, template) {
            var selChd = itjq(id);
            var quartoItem = selChd.closest('.quartoItem');
            var quartoIdade = quartoItem.find('.quartoIdade');
            quartoIdade.find('.quartoIdadeSel').remove();
            if (selChd.val() > 0) {
                quartoIdade.show();
            } else {
                quartoIdade.hide();
            }
            var idadeList = null;
            if (quartoConfig) {
                var dsClass = quartoItem.attr('class').substr(quartoItem.attr('class').indexOf('it-qi'));
                var idx = parseInt(dsClass.substring(0, dsClass.indexOf(' ') > 0 ? dsClass.indexOf(' ') : dsClass.length).replace('it-qi', '')) - 1;
                if (quartoConfig.length >= idx) {
                    if (quartoConfig[idx] && quartoConfig[idx].chd) {
                        idadeList = quartoConfig[idx].chd;
                    }
                }
            }
            for (var i = 1; i <= selChd.val(); i++) {
                var quartoIdadeSel = itjq(template);
                var sel = quartoIdadeSel.find('select');
                for (var x = 0; x <= layoutBusca.qtIdadeMaxChd; x++) {
                    sel.append(itjq('<option>', {
                        value: x,
                        text: x + (x > 1 ? ' ' + ___('anos') : ' ' + ___('ano'))
                    }));
                }
                var qt = 0;
                if (idadeList && idadeList.length >= idx) {
                    qt = idadeList[i - 1];
                }
                sel.val(qt);
                quartoIdade.append(quartoIdadeSel);
            }
        }

        function fncSnr(id) {
            var sel = id.find('.quartoSnr select');
            if (itjq(sel).length) {
                var selAdt = id.find('.quartoAdt select');
                var qtSnr = layoutBusca.qtAdtMax - selAdt.val();
                sel.find('option').remove();
                for (var i = 0; i <= qtSnr; i++) {
                    sel.append(itjq('<option>', {value: i, text: i}));
                }
                var qt = 0;
                if (quartoConfig) {
                    var dsClass = id.attr('class').substr(id.attr('class').indexOf('it-qi'));
                    var idx = parseInt(dsClass.substring(0, dsClass.indexOf(' ') > 0 ? dsClass.indexOf(' ') : dsClass.length).replace('it-qi', '')) - 1;
                    if (quartoConfig.length >= idx) {
                        if (quartoConfig[idx] && quartoConfig[idx].snr) {
                            qt = quartoConfig[idx].snr.length;
                        }
                    }
                }
                sel.val(qt);
                var quartoIdadeSel = id.find('.quartoSnrIdade .quartoSnrIdadeSel');
                if (layoutBusca.stMelhorIdade == null || !layoutBusca.stMelhorIdade) {
                    id.find('.quartoSnr').remove();
                    id.find('.quartoSnrIdade').remove();
                } else {
                    sel.show();
                    quartoIdadeSel.show();
                    if (quartoIdadeSel[0]) {
                        var template = quartoIdadeSel[0].outerHTML;
                        sel.change(function () {
                            fncIdadeSnr(this, template);
                        });
                        fncIdadeSnr(sel, template);
                    }
                }
            }

        }

        function fncIdadeSnr(id, template) {
            var selSnr = itjq(id);
            var quartoItem = selSnr.closest('.quartoItem');
            var quartoIdade = quartoItem.find('.quartoSnrIdade');
            quartoIdade.find('.quartoSnrIdadeSel').remove();
            if (selSnr.val() > 0) {
                quartoIdade.show();
            } else {
                quartoIdade.hide();
            }
            var idadeList = null;
            if (quartoConfig) {
                var dsClass = quartoItem.attr('class').substr(quartoItem.attr('class').indexOf('it-qi'));
                var idx = parseInt(dsClass.substring(0, dsClass.indexOf(' ') > 0 ? dsClass.indexOf(' ') : dsClass.length).replace('it-qi', '')) - 1;
                if (quartoConfig.length >= idx) {
                    if (quartoConfig[idx] && quartoConfig[idx].snr) {
                        idadeList = quartoConfig[idx].snr;
                    }
                }
            }
            for (var i = 1; i <= selSnr.val(); i++) {
                var quartoIdadeSel = itjq(template);
                var sel = quartoIdadeSel.find('input');
                sel.attr('min', layoutBusca.qtIdadeMinSnr).attr('max', 120).attr('maxlength', 3);
                var qt = layoutBusca.qtIdadeMinSnr;
                if (idadeList && idadeList.length >= idx) {
                    qt = idadeList[i - 1];
                }
                sel.val(qt);
                quartoIdade.append(quartoIdadeSel);
            }
        }

        fncQuartoItem(quartoSel);
        if (itjq(quartoSel).length > 0) {
            quartoSel.change(function () {
                quartoConfig = configQuartoJson(gerarQuartoPesquisa(id), layoutBusca);
                fncQuartoItem(this);
            });
        }

        try {
            // USADO PARA O B2C
            montaDescricaoPaxmotor(id);
        } catch (err) {
        }
    }

    function gerarQuartoPesquisa(ithis) {
        var quartoList = ithis.find('.quartoItem');
        var dsConfig = "";
        quartoList.each(function (idx, item) {
            var adt = itjq(item).find('.quartoAdt select');
            var idade = itjq(item).find('.quartoChd select');
            var idadeList = itjq(item).find('.quartoIdade select');
            dsConfig += "!" + adt.val();
            if (idade.val() && idade.val() > 0) {
                idadeList.each(function (idxA, itemA) {
                    dsConfig += "-" + itjq(itemA).val();
                });
            }
            var idadeSnr = itjq(item).find('.quartoSnr select');
            var idadeSnrList = itjq(item).find('.quartoSnrIdade input');
            if (idadeSnr.val() && idadeSnr.val() > 0) {
                idadeSnrList.each(function (idxA, itemA) {
                    dsConfig += "-" + itjq(itemA).val();
                });
            }
        });
        return dsConfig.substr(1);
    }

    function verificaQuartoPesquisa(ithis, opt) {
        var result = false;
        var layoutBusca = null;
        if (opt.hotel) {
            layoutBusca = opt.hotel.layoutBusca;
        } else if (opt.pacoteHotel) {
            layoutBusca = opt.pacoteHotel.layoutBusca;
        } else if (opt.pacoteAereo) {
            layoutBusca = opt.pacoteAereo.layoutBusca;
        } else if (opt.rodoServico) {
            layoutBusca = opt.rodoServico.layoutBusca;
        } else if (opt.rodoHotel) {
            layoutBusca = opt.rodoHotel.layoutBusca;
        } else if (opt.pacoteDinamico) {
            layoutBusca = opt.pacoteDinamico.layoutBusca;
        } else if (opt.aereo) {
            layoutBusca = opt.aereo.layoutBusca;
        } else if (opt.servico) {
            layoutBusca = opt.servico.layoutBusca;
        }
        if (layoutBusca && layoutBusca.stMelhorIdade) {
            var quartoList = ithis.find('.quartoItem');
            quartoList.each(function (idx, item) {
                var adt = itjq(item).find('.quartoAdt select');
                adt.removeClass('error');
                var idadeSnr = itjq(item).find('.quartoSnr select');
                if (idadeSnr) {
                    idadeSnr.removeClass('error');
                    if ((adt.val() == 0 && typeof idadeSnr.val() == 'undefined') || (adt.val() == 0 && idadeSnr.val() == 0)) {
                        adt.addClass('error');
                        idadeSnr.addClass('error');
                        result = true;
                    }
                }
            });
        }
        return result;
    }

    function geraQtNoite(input) {
        var input = itjq(input);
        var form = input.closest('form');

        var dtIni = form.find('.dtIni').val();
        var dtFim = form.find('.dtFim').val();
        var qtNoiteInp = form.find('.qtNoite');

        var createDate = function (data) {
            return new Date(data.split('/').reverse().join('').replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
        };

        if (typeof qtNoiteInp.html() != 'undefined') {
            if (dtIni && dtFim) {

                const diferencaEmDias = function (date1, date2) {
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    return diffDays;
                };

                var qtNoite = diferencaEmDias(createDate(dtIni), createDate(dtFim));
                var text = qtNoite > 1 ? ___('noites') : ___('noite');

                qtNoiteInp.text(qtNoite + ' ' + text);
            }
        }

    }

    function dateRage(dtIni, dtFim, layoutBusca) {
        var numerOfMonths = layoutBusca.numerOfMonths ? layoutBusca.numerOfMonths : 1;
        var minDate = typeof layoutBusca.qtDiaPartida !== 'undefined' && layoutBusca.qtDiaPartida !== null && layoutBusca.qtDiaPartida !== false ? layoutBusca.qtDiaPartida : 1;
        var maxDate = null;
        var minDateFim = minDate;
        var maxDateFim = maxDate;
        var addDiaFim = typeof layoutBusca.qtDiaRetorno !== 'undefined' && layoutBusca.qtDiaRetorno !== null && layoutBusca.qtDiaRetorno !== false ? layoutBusca.qtDiaRetorno : 0;
        if (layoutBusca.dataEspecial && layoutBusca.dataEspecial.isDataAberto == null) {
            layoutBusca.dataEspecial.isDataAberto = true;
        }

        function changed(selectedDate) {
            var date2 = dtIni.datepicker('getDate');
            if (layoutBusca.dataEspecial != null) {
                dtFim.datepicker("setDate", null);
                var ddmmYY = ((date2.getDate() + '').length == 1 ? '0' : '') + date2.getDate() + '/' + ((date2.getMonth() + '').length == 1 ? '0' : '') + (date2.getMonth() + 1) + '/' + date2.getFullYear();
                layoutBusca.dataEspecial.datas.forEach(function (obj) {
                    if (obj.dtIni && obj.dtIni == ddmmYY) {
                        dtFim.dados = obj.dtFim.split(',');
                        gerarDtFim();
                        return true;
                    }
                });
            } else {
                date2.setDate(date2.getDate() + addDiaFim);
                dtFim.datepicker("option", "minDate", date2);
                dtFim.datepicker("setDate", date2);
            }
            geraQtNoite(dtIni);

            var t = setTimeout(function () {
                clearTimeout(t);
                dtFim.focus();
            }, 0);
        }

        function beforeShowDay(date) {
            if (layoutBusca.dataEspecial) {
                var mmYY = ((date.getMonth() + '').length == 1 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
                var ddmmYY = ((date.getDate() + '').length == 1 ? '0' : '') + date.getDate() + '/' + mmYY;
                var exist = false;
                var result = false;
                layoutBusca.dataEspecial.datas.forEach(function (obj) {
                    if (obj.mmYY && obj.mmYY == mmYY) {
                        exist = true;
                        if (obj.semana && obj.semana.includes(date.getDay() + 1)) {
                            result = true;
                            return true;
                        }
                    } else if (obj.dtIni && obj.dtIni == ddmmYY) {
                        exist = true;
                        result = true;
                        return true;
                    }
                });
                if (exist) {
                    return [result];
                }
                return [layoutBusca.dataEspecial.isDataAberto];
            } else {
                return [true];
            }
        }

        function beforeShowDayFim(date) {
            if (layoutBusca.dataEspecial) {
                var mmYY = ((date.getMonth() + '').length == 1 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
                var exist = false;
                var result = false;
                layoutBusca.dataEspecial.datas.forEach(function (obj) {
                    if (obj.mmYY && obj.mmYY == mmYY) {
                        exist = true;
                        if (obj.semana && obj.semana.includes(date.getDay() + 1)) {
                            result = true;
                            return true;
                        }
                    }
                });
                if (exist) {
                    return [result];
                }
                return [layoutBusca.dataEspecial.isDataAberto];
            } else {
                return [true];
            }
        }

        if (layoutBusca.dataEspecial) {
            if (!layoutBusca.dataEspecial.isDataAberto) {
                let minDateEsp = null, maxDateEsp = null, minDateFimEsp = null, maxDateFimEsp = null;
                if (layoutBusca.dataEspecial.datas) {
                    if (layoutBusca.dataEspecial.datas.length == 1) {
                        dtIni.val(layoutBusca.dataEspecial.datas[0].dtIni);
                        minDate = dtIni.val();
                        maxDate = dtIni.val();
                        dtFim.val(layoutBusca.dataEspecial.datas[0].dtFim);
                        minDateFim = dtFim.val();
                        maxDateFim = dtFim.val();
                    } else {
                        layoutBusca.dataEspecial.datas.forEach(function (obj) {
                            if (obj.mmYY) {
                                let yyMM = obj.mmYY.split('/').reverse().join('/');
                                if (minDateEsp == null || minDateEsp > yyMM) {
                                    minDateEsp = obj.mmYY;
                                    minDateFimEsp = obj.mmYY;
                                }
                                if (maxDateEsp == null || yyMM > maxDateEsp) {
                                    maxDateEsp = obj.mmYY;
                                    maxDateFimEsp = obj.mmYY;
                                }
                            } else if (obj.dtIni) {
                                let yyMMIni = obj.dtIni.substr(3).split('/').reverse().join('/');
                                let yyMMFim = obj.dtFim.substr(3).split('/').reverse().join('/');
                                if (minDateEsp == null || minDateEsp > yyMMIni) {
                                    minDateEsp = yyMMIni.split('/').reverse().join('/');
                                }
                                if (maxDateEsp == null || yyMMIni > maxDateEsp) {
                                    maxDateEsp = yyMMIni.split('/').reverse().join('/');
                                }
                                if (minDateFimEsp == null || minDateFimEsp > yyMMFim) {
                                    minDateFimEsp = yyMMFim.split('/').reverse().join('/');
                                }
                                if (maxDateFimEsp == null || yyMMFim > maxDateFimEsp) {
                                    maxDateFimEsp = yyMMFim.split('/').reverse().join('/');
                                }
                            }
                        });
                        if (!layoutBusca.dataEspecial.isDataAberto) {
                            if (minDateEsp) {
                                minDateEsp = '01/' + minDateEsp;
                                minDateEsp = minDateEsp.split('/');
                                minDate = new Date(minDateEsp[2], parseInt(minDateEsp[1]) - 1, minDateEsp[0]);
                            }
                            if (maxDateEsp) {
                                maxDateEsp = '01/' + maxDateEsp;
                                maxDateEsp = maxDateEsp.split('/');
                                maxDate = new Date(maxDateEsp[2], parseInt(maxDateEsp[1]), maxDateEsp[0]);
                                maxDate.setDate(maxDate.getDate() - 1);
                            }
                            if (minDateFimEsp) {
                                minDateFimEsp = '01/' + minDateFimEsp;
                                minDateFimEsp = minDateFimEsp.split('/');
                                minDateFim = new Date(minDateFimEsp[2], parseInt(minDateFimEsp[1]) - 1, minDateFimEsp[0]);
                            }
                            if (maxDateFimEsp) {
                                maxDateFimEsp = '01/' + maxDateFimEsp;
                                maxDateFimEsp = maxDateFimEsp.split('/');
                                maxDateFim = new Date(maxDateFimEsp[2], parseInt(maxDateFimEsp[1]), maxDateFimEsp[0]);
                                maxDateFim.setDate(maxDateFim.getDate() - 1);
                            }
                        }
                    }
                }
            }
        }
        dtIni.datepicker(itjq.datepicker.regional['pt-BR']);
        dtIni.datepicker("option", {
            minDate: minDate,
            maxDate: maxDate,
            numberOfMonths: numerOfMonths,
            onSelect: function (selectedDate) {
                geraQtNoite(this);
                changed(selectedDate);
            },
            beforeShowDay: beforeShowDay
        }).blur(function () {
            if (!itjq(this).val()) {
                dtFim.val('');
            }
        }).keyup(function () {
            if (!itjq(this).val()) {
                dtFim.val('');
            }
        }).attr('readonly', 'readonly');
        var ph = dtIni.attr('placeholder');
        if (ph == null || ph.length == 0) {
            dtIni.attr('placeholder', 'dd/mm/aaaa');
        }
        dtFim.datepicker(itjq.datepicker.regional['pt-BR']);
        dtFim.datepicker("option", {
            minDate: minDateFim,
            maxDate: maxDateFim,
            numberOfMonths: numerOfMonths,
            onSelect: function (selectedDate) {
                geraQtNoite(this);
            },
            beforeShowDay: beforeShowDayFim
        }).focus(function () {
            if (dtIni.val() == null || dtIni.val().length != 10) {
                dtFim.val('');
                setTimeout(function () {
                    dtIni.focus();
                }, 0);
            }
        }).attr('readonly', 'readonly');
        ph = dtFim.attr('placeholder');
        if (ph == null || ph.length == 0) {
            dtFim.attr('placeholder', 'dd/mm/aaaa');
        }

        function gerarDtFim() {
            dtFim.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
            if (dtFim.dados) {
                var dados = dtFim.dados;
                if (dados == null) {
                    dtFim.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                } else {
                    dados = dados.sort(function (a, b) {
                        a = a.split('/').reverse().join('/');
                        b = b.split('/').reverse().join('/');
                        if (a < b) {
                            return -1;
                        } else if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                    var dtLast = dados[dados.length - 1].toString().split('/');
                    var yyLast = dtLast[2];
                    var mmLast = parseInt(dtLast[1]) - 1;
                    var ddLast = dtLast[0];
                    if (ddLast.indexOf('0') === 0) {
                        ddLast = ddLast.substr(1);
                    }
                    var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                    var dtMin = dados[0].toString().split('/');
                    var yyMin = dtMin[2];
                    var mmMin = parseInt(dtMin[1]) - 1;
                    var ddMin = 1;
                    var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                    dtFim.datepicker('option', {
                        minDate: minDate,
                        maxDate: maxDate,
                        beforeShowDay: function (date) {
                            var list = dados;
                            for (var i = 0; i < list.length; i++) {
                                var dateTmp = list[i].toString().split('/');
                                var yy = dateTmp[2];
                                var mm = parseInt(dateTmp[1]) - 1;
                                var dd = dateTmp[0];
                                if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                    return [true, 'calendario destacado'];
                                }
                            }
                            return [false, ''];
                        }
                    });
                    if (itjq(dados).length == 1) {
                        dtFim.val(dtMin[0] + '/' + dtMin[1] + '/' + yyMin);
                        geraQtNoite(dtFim);
                    }
                    dtFim.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', '');
                }

            } else {
                dtFim.attr('placeholder', ___('favorSelecioneORetorno')).val("");
            }
        }
    }

    itjq.widget("custom.itAutocompleteCat", itjq.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        }, _renderMenu: function (ul, items) {
            var showCategory = this.options.showCategory;
            var that = this, currentCategory = "";
            var qt = itjq(items).length;
            if (showCategory && qt == 1) {
                if (items[0].id == "") {
                    showCategory = false;
                }
            }
            if (showCategory) {
                function descricao(item) {
                    if (item.category == 'A') {
                        item.category = {nome: ___('aeroportos'), tipo: item.category, seq: 3};
                    } else if (item.category == 'M') {
                        item.category = {nome: ___('destinos'), tipo: item.category, seq: 1};
                    } else if (item.category == 'D') {
                        item.category = {nome: ___('destinos'), tipo: item.category, seq: 2};
                    } else if (item.category == 'H') {
                        item.category = {nome: ___('hoteis'), tipo: item.category, seq: 4};
                    } else if (item.category == 'T') {
                        item.category = {nome: ___('trem'), tipo: item.category, seq: 5};
                    } else if (item.category == 'P') {
                        item.category = {nome: ___('porto'), tipo: item.category, seq: 5};
                    }
                }

                itjq.each(items, function (index, item) {
                    descricao(item);
                });

                function sortLabel(a, b) {
                    if (a.label < b.label) {
                        return -1;
                    } else if (a.label > b.label) {
                        return 1;
                    }
                    return 0;
                }

                // items.sort(function (a, b) {
                //     var cat = a.category.seq - b.category.seq;
                //     if (cat == 0) {
                //         var sq = (b.sq - a.sq);
                //         return sq == 0 ? sortLabel(a, b) : sq;
                //     }
                //     return cat;
                // });

                const templateLabel = function (label) {
                    return '<span style="margin-left: 20px;">' + label + '</span>';
                }

                itjq.each(items, function (index, item) {
                    var li;
                    //                    if (item.category.tipo != currentCategory) {
                    //                        ul.append("<li class='ui-autocomplete-category'><b>" + item.category.nome + "</b></li>");
                    //                        currentCategory = item.category.tipo;
                    //                    }
                    li = that._renderItem = function (ul, item) {
                        var li = itjq("<li></li>")
                            .data("item.autocomplete", item);

                        if (item.category) {
                            var nmRegiao = typeof item.nmRegiao != 'undefined' && item.nmRegiao ? '<br/>' + templateLabel(item.nmRegiao) : '';
                            li.append('<div><img style="width:16px;margin-right:5px;' + (nmRegiao != '' ? 'position:absolute;top: 30%;' : '') + '" src="https://infotravel-media.s3-sa-east-1.amazonaws.com/images/motor-ico/' + item.category.tipo + '.png" />' + templateLabel(item.label) + nmRegiao + '</div>');
                        }

                        return li.appendTo(ul);
                    };
                    li = that._renderItemData(ul, item);
                    //                    if (item.category.tipo) {
                    //                        li.attr("aria-label", item.category.tipo + " : " + item.label);
                    //                    }
                });

            } else {
                itjq.each(items, function (index, item) {
                    that._renderItemData(ul, item);
                });
            }
        }
    });

    function gerarPesquisa(e, tp, ithis, origem, destino, dtIni, dtFim, opt, idPacote) {
        var stError = false;
        if (origem) {
            origem.removeClass('error');
        }
        destino.removeClass('error');
        destino.next().removeClass('error');
        dtIni.removeClass('error');
        if (tp == 'a') {
            if (ithis.find('.pnlTpTrechoCheck input:checked').val() == 'ida') {
                dtFim = null;
            }
        }
        if (dtFim) {
            dtFim.removeClass('error');
        }
        if (origem) {
            var vlOrigem = origem.val();
            if (!vlOrigem || vlOrigem.length < 3) {
                origem.addClass('error');
                stError = true;
            }
            if (vlOrigem.indexOf(';') > -1) {
                vlOrigem = vlOrigem.split(';');
                vlOrigem = vlOrigem[0];
            }
            if (vlOrigem.indexOf('#') > -1) {
                vlOrigem = vlOrigem.substr(0, vlOrigem.indexOf('#')).replace('#', '');
            }
        }
        var vlDestino = destino.val();
        if (!vlDestino || vlDestino.length < 3) {
            destino.next().addClass('error');
            destino.addClass('error');
            stError = true;
        }
        if (vlDestino.indexOf(';') > -1) {
            vlDestino = vlDestino.split(';');
            vlDestino = vlDestino[0];
        }
        var valQuarto = gerarQuartoPesquisa(ithis);
        if (verificaQuartoPesquisa(ithis, opt)) {
            stError = true;
        }
        var vlDtIni = dtIni.val().replace('/', '-').replace('/', '-').replace('/', '-');
        if (!vlDtIni || vlDtIni.length <= 7) {
            dtIni.addClass('error');
            stError = true;
        } else {
            if (SG_IDIOMA === 'en_US') {
                vlDtIni = vlDtIni.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
            }
        }
        var vlDtFim = null;
        if (dtFim) {
            vlDtFim = dtFim.val().replace('/', '-').replace('/', '-').replace('/', '-');
            if (!vlDtFim || vlDtFim.length <= 7) {
                dtFim.addClass('error');
                stError = true;
            } else {
                if (SG_IDIOMA === 'en_US') {
                    vlDtFim = vlDtFim.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
                }
            }
        }
        var nrCupom = "";
        if (ithis.find(".nrCupom").length && typeof ithis.find(".nrCupom") != "undefined" && ithis.find(".nrCupom").val() != "") {
            nrCupom = "?nrCupom=" + ithis.find(".nrCupom").val();
        }

        var stComBagagem = ithis.find('.stComBagagem').val();
        if (stComBagagem && typeof stComBagagem != "undefined" && stComBagagem != "") {
            nrCupom += (nrCupom != "" ? "&stComBagagem=" + stComBagagem : "?stComBagagem=" + stComBagagem);
        }

        var stDestinoDiff = ithis.find('.stDestinoDiff').is(':checked');
        var destinoDiff = ithis.find('.destinoDiff');
        destinoDiff.removeClass('error');
        if (stDestinoDiff) {
            var vlDestinoDiff = destinoDiff.val();

            if (!vlDestinoDiff || vlDestinoDiff.length < 3) {
                destinoDiff.addClass('error');
                stError = true;
            }
            if (vlDestinoDiff.indexOf(';') > -1) {
                vlDestinoDiff = vlDestinoDiff.split(';');
                vlDestinoDiff = vlDestinoDiff[0];
            }

            nrCupom += (nrCupom != "" ? "&destinoDiff=" + vlDestinoDiff : "?destinoDiff=" + vlDestinoDiff);
        }

        if (opt.queryParams != null) {
            nrCupom += nrCupom + (nrCupom != "" ? "&" + opt.queryParams : "?" + opt.queryParams);
        }

        var vlClasse = "SP";
        if (ithis.find(".idClasse").length && typeof ithis.find(".idClasse") != "undefined" && ithis.find(".idClasse").val() != "") {
            vlClasse = ithis.find(".idClasse").val();
        }

        var vlPacote = idPacote == null ? '' : 'P' + idPacote + '/';
        var nmHref = opt.nmDominioB2C;
        if (stError) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            var urlBotao = null;
            var iframe = opt.iframe ? 'I' : '';
            if ((nmDominio == 'reservas.aviva.com.br' || nmDominio == 'reservas-hml.ctrq.com.br' || nmDominio == '187.72.236.40') && tp == 'ho' && vlDestino == 'M31802') {
                tp = 'ph';
            }
            if (tp == 'ho') {
                var nmUnidade = opt.stAgencia && opt.hotel.layoutBusca ? "U" + opt.hotel.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'hotel/' + nmUnidade + vlDestino + "/" + vlDtIni + '/' + vlDtFim + '/' + valQuarto + nrCupom;
            } else if (tp == 'ph') {
                var nmUnidade = opt.pacoteHotel ? (opt.stAgencia && opt.pacoteHotel.layoutBusca ? "U" + opt.pacoteHotel.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "") : (opt.stAgencia && opt.hotel.layoutBusca ? "U" + opt.hotel.idPessoa + iframe + "/" : AGENCIA ? AGENCIA + "/" : "");
                urlBotao = nmHref + 'pacotes/pacote_hotel/' + nmUnidade + vlPacote + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
            } else if (tp == 'pa') {
                var nmUnidade = opt.stAgencia && opt.pacoteAereo.layoutBusca ? "U" + opt.pacoteAereo.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'pacotes/pacote_aereo/' + nmUnidade + vlPacote + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
            } else if (tp == 'prs') {
                var nmUnidade = opt.stAgencia && opt.rodoServico.layoutBusca ? "U" + opt.rodoServico.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'pacotes/pacote_rodo_servico/' + nmUnidade + vlPacote + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
            } else if (tp == 'prh') {
                var nmUnidade = opt.stAgencia && opt.rodoHotel.layoutBusca ? "U" + opt.rodoHotel.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'pacotes/pacote_rodo_hotel/' + nmUnidade + vlPacote + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
            } else if (tp == 'pd') {
                var nmUnidade = opt.stAgencia && opt.pacoteDinamico.layoutBusca ? "U" + opt.pacoteDinamico.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'pacotes/dinamico/' + nmUnidade + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + vlDtFim + '/' + valQuarto + nrCupom;
            } else if (tp == 'a') {
                var nmUnidade = opt.stAgencia && opt.aereo.layoutBusca ? "U" + opt.aereo.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                //urlBotao = nmHref + 'voos/' + nmUnidade + vlClasse + '/10/' + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
                urlBotao = nmHref + 'voos/' + nmUnidade + vlOrigem + '/' + vlDestino + "/" + vlDtIni + '/' + (dtFim ? vlDtFim + '/' : '') + valQuarto + nrCupom;
            } else if (tp == 's') {
                var nmUnidade = opt.stAgencia && opt.hotel.layoutBusca ? "U" + opt.hotel.layoutBusca.idPessoa + iframe + "/" : B2C_AGENCIA ? B2C_AGENCIA + "/" : "";
                urlBotao = nmHref + 'servicos/' + nmUnidade + vlDestino + "/" + vlDtIni + '/' + vlDtFim + '/' + valQuarto + nrCupom;
            }

            if (ithis.find('.pnlBotao a').is('a')) {
                ithis.find('.pnlBotao a').prop("href", urlBotao);
            } else if (opt.target) {
                window.open(urlBotao, opt.target);
            } else if (opt.getUrl) {
                ithis.find('.pnlBotao button').attr('url', urlBotao);
            } else {
                try {
                    B2C.hideContent();
                    B2C.showPreloader();
                } catch (e) {
                }
                document.location.href = urlBotao;
            }
        }
    }


    const pesquisarMotor = function (nmDestino, tpMotor, sgIdioma) {
        var result = [];

        if (nmDestino) {
            nmDestino = nmDestino.toUpperCase();
        }

        if (tpMotor === "H" || tpMotor === "S" || tpMotor === "V" || tpMotor === "M") {
            var itList = pesquisarRegiao(nmDestino, sgIdioma);
            if (itList && itList.length > 0) {
                itList.forEach(function (it) {
                    result.push({
                        id: it.id,
                        nm: it.nmRegiao,
                        tp: it.tpDestino,
                        sg: it.sgIata,
                        sq: null,
                        sb: it.sbRegiao
                    });
                });
            }
        }

        if (tpMotor === "H") {
            var itList = pesquisarHotel(nmDestino, sgIdioma);
            if (itList && itList.length > 0) {
                itList.forEach(function (it) {
                    result.push({
                        id: it.id,
                        nm: it.nmHotel,
                        tp: "H",
                        sg: null,
                        sq: null,
                        sb: it.nmRegiao
                    });
                });
            }
        }

        if (tpMotor === "A") {
            var itList = pesquisarAeroporto(nmDestino, sgIdioma);
            if (itList && itList.length > 0) {
                itList.forEach(function (it) {
                    result.push({
                        id: it.id,
                        nm: it.nmRegiao,
                        tp: "A",
                        sg: it.sgIata,
                        sq: null,
                        sb: null
                    });
                });
            }
        }

        if (tpMotor === "R") {
            var itList = pesquisarRodoviaria(nmDestino, sgIdioma);
            if (itList && itList.length > 0) {
                itList.forEach(function (it) {
                    result.push({
                        id: it.id,
                        nm: it.nmRodoviaria,
                        tp: "R",
                        sg: null,
                        sq: null
                    });
                });
            }
        }

        if (tpMotor === "T") {
            var itList = pesquisarEstacaoTrem(nmDestino, sgIdioma);
            if (itList) {
                itList.forEach(function (it) {
                    result.push({
                        id: it.id,
                        nm: it.nmEstacao,
                        tp: "E",
                        sg: null,
                        sq: null
                    });
                });
            }
        }

        return result;
    }

    const ajaxMotor = function (url) {
        var result = null;

        itjq.ajax({
            url: url,
            async: false,
            dataType: "json",
            success: function (data) {
                result = data;
            }
        });

        return result;
    };

    const pesquisarHotel = function (nmDestino, sgIdioma) {
        return ajaxMotor(urlMotorIntegra + "hotel/pesquisar/" + nmDestino + "/0/null/null/null");
    };

    const pesquisarRegiao = function (nmDestino, sgIdioma) {
        return ajaxMotor(urlMotorIntegra + "regiao/pesquisar/" + nmDestino + "/null/" + sgIdioma);
    };

    const pesquisarAeroporto = function (nmDestino, sgIdioma) {
        return ajaxMotor(urlMotorIntegra + "aeroporto/pesquisar/" + nmDestino.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim() + "/null/null/" + sgIdioma);
    };

    const pesquisarRodoviaria = function (nmDestino, sgIdioma) {
        return ajaxMotor(urlMotorIntegra + "rodoviaria/pesquisar/" + nmDestino + "/null/" + sgIdioma);
    };

    const pesquisarEstacaoTrem = function (nmDestino, sgIdioma) {
        return ajaxMotor(urlMotorIntegra + "estacaoTrem/pesquisar/" + nmDestino + "/null/" + sgIdioma);
    };

    this.getOPT = function (newOPT) {
        return opt;
    }

    this.setOPT = function (newOPT) {
        opt = Object.assign({}, opt, newOPT || {});
    }

    //
    //
    //
    // MOTOR HOTEL
    //
    //
    //

    this.motorHotel = function (id, optHp) {
        var boo = typeof (opt) === "boolean" || !opt;
        if (boo) {
            optHp = {stDestinoFixo: opt ? opt : false};
        }

        optHp = Object.assign({}, {
            stDestinoFixo: false,
            destino: null,
            stDataFixo: false,
            dataEspecial: null,
            quarto: null
        }, optHp);

        if (optHp.destino == null) {
            if (document.location.hostname.includes('reservas.costadosauipe.com.br') || nmDominio.includes('reservas.costadosauipe.com.br')) {
                optHp.destino = [
                    {"id": 35262, "nm": "Costa do Sauipe, RegiÃ£o Nordeste, Brasil", "tp": "M"}
                ]
            } else if (
                (document.location.hostname.includes('reservas-hml.ctrq.com.br') || nmDominio.includes('reservas-hml.ctrq.com.br'))
                || (document.location.hostname.includes('reservas.rioquente.com.br') || nmDominio.includes('reservas.rioquente.com.br'))
            ) {
                optHp.destino = [
                    {"id": 154826, "nm": "Rio Quente, RegiÃ£o Centro-Oeste, Brasil", "tp": "M"}
                ]
            } else if (document.location.hostname.includes('reservas.aviva.com.br') || nmDominio.includes('reservas.aviva.com.br')) {
                optHp.destino = [
                    {"id": 154826, "nm": "Rio Quente, RegiÃ£o Centro-Oeste, Brasil", "tp": "M"},
                    {"id": 35262, "nm": "Costa do Sauipe, RegiÃ£o Nordeste, Brasil", "tp": "M"},
                    {"id": 31802, "nm": "Caldas Novas, RegiÃ£o Centro-Oeste, Brasil", "tp": "M"}
                ]
            }
        }

        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button,.pnlBotao a');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var destino = ithis.find('.idDestino');

            function gerarDestino(data) {
                if (!optHp.stDestinoFixo) {
                    var layoutBusca = data.layoutBusca;
                    data = optHp.destino == null ? (data == null || data.destino == null ? null : data.destino) : optHp.destino;
                    layoutBusca.stDestinoAutocompletar = optHp.destino == null ? layoutBusca.stDestinoAutocompletar : false;

                    if (document.location.hostname.includes('litoralverde') || nmDominio.includes('litoralverde')) {
                        layoutBusca.stDestinoAutocompletar = true;
                    }

                    var inputComplemento = itjq(document.createElement(layoutBusca.stDestinoAutocompletar == 'S' || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).attr("style", destino.attr('style')).attr('placeholder', destino.attr('placeholder')).show();
                    destino.after(inputComplemento);
                    var vlDestino = destino.val();
                    if (vlDestino && vlDestino.indexOf(';') > -1) {
                        vlDestino = vlDestino.split(';');
                        vlDestino = vlDestino[1];
                    } else {
                        vlDestino = "";
                    }
                    var inputMostraCodigo = null;
                    if (stMostraCodigo) {
                        inputMostraCodigo = itjq(document.createElement("div")).html(__('codigo') + '...');
                        inputComplemento.after(inputMostraCodigo);
                    }
                    if (!layoutBusca.stDestinoAutocompletar && data == null) {
                        inputComplemento.val(___('nenhumDestinoEncontrado')).attr('readonly', 'readonly');
                    } else if (layoutBusca.stDestinoAutocompletar) {
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {

                                const result = pesquisarMotor(request.term, "H", SG_IDIOMA);

                                if (result && result.length > 0) {
                                    response(itjq.map(result, function (item) {
                                        return {
                                            label: item.nm,
                                            id: item.tp + item.id + ';' + item.nm,
                                            category: item.tp,
                                            sq: 0,
                                            nmRegiao: item.sb
                                        };
                                    }));
                                } else {
                                    response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                                }

                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                destino.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                return false;
                            }
                        }).val(vlDestino);
                        if (destino.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', destino.attr("autocorrect"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', destino.attr("spellcheck"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', destino.attr("autocomplete"));
                        }
                    } else if (vlDestino != "") {
                        inputComplemento.val(vlDestino).attr('readonly', 'readonly');
                        if (stMostraCodigo) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigo.html(valMostraCodigo[0]);
                        }
                    } else if (itjq(data).length == 1) {
                        destino.val(data[0].tp + data[0].id + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (stMostraCodigo) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigo.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + item.id + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            destino.val(itjq(this).val());
                            if (inputMostraCodigo) {
                                var valMostraCodigo = destino.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigo.html(valMostraCodigo[0]);
                            }
                        });
                    }
                }
            }

            destino.hide();
            var dtIni = ithis.find(".dtIni");
            var dtFim = ithis.find(".dtFim");
            geraQtNoite(dtIni);

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/hospedagem/' + chave,
                success: function (data) {

                    if (data !== null) {
                        data = {layoutBusca: data};
                        gerarDestino(data);
                        ithis.children().show();
                        ithis.find('.load').hide();
                        configQuarto(ithis, data.layoutBusca, optHp);
                        data.layoutBusca.dataEspecial = optHp.dataEspecial;
                        if (optHp.dataEspecial) {
                            data.layoutBusca.dataEspecial.datas.forEach(function (obj) {
                                if (obj.semana) {
                                    obj.semana = obj.semana.replace('D', '1').replace('S', '7');
                                }
                            });
                        }
                        if (optHp.stDataFixo) {
                            dtIni.attr('readonly', 'readonly');
                            dtFim.attr('readonly', 'readonly');
                        } else {
                            dateRage(dtIni, dtFim, data.layoutBusca);
                        }

                        opt.hotel = {layoutBusca: data.layoutBusca};
                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });

            btnPesquisa.click(function (e) {
                gerarPesquisa(e, 'ho', ithis, null, destino, dtIni, dtFim, opt, null);
            });
        });
    };

    //
    //
    //
    // MOTOR PACOTE DINAMICO
    //
    //
    //

    this.motorPacoteDinamico = function (id, optPd, stDestinoFixo) {
        var nmPath = http + nmDominio + '/infotravel/ws/v1/motor/pacote-dinamico/' + chave;
        var boo = typeof (opt) === "boolean" || !opt;
        if (boo) {
            optPd = {stOrigemFixo: opt ? opt : false};
        }
        optPd = Object.assign({}, {stOrigemFixo: false, stDestinoFixo: stDestinoFixo, destino: null}, optPd);
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button,.pnlBotao a');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var origem = ithis.find('.idOrigem');
            if (!optPd.stOrigemFixo) {
                var inputComplementoO = itjq(document.createElement("input")).attr("type", "text").attr("class", origem.attr("class")).attr("style", origem.attr('style')).attr('placeholder', origem.attr('placeholder'));
                origem.after(inputComplementoO);
                var vlOrigem = origem.val();
                if (vlOrigem && vlOrigem.indexOf(';') > -1) {
                    vlOrigem = vlOrigem.split(';');
                    vlOrigem = vlOrigem[1];
                } else {
                    vlOrigem = "";
                }
                var inputMostraCodigoOri = null;
                if (stMostraCodigo) {
                    inputMostraCodigoOri = itjq(document.createElement("div")).html(___('codigo') + '...');
                    inputComplementoO.after(inputMostraCodigoOri);
                }
                inputComplementoO.itAutocompleteCat({
                    source: function (request, response) {

                        const result = pesquisarMotor(request.term, "A", SG_IDIOMA);
                        console.log(result);

                        if (result && result.length > 0) {
                            response(itjq.map(result, function (item) {
                                return {
                                    label: item.nm,
                                    id: item.tp + item.id + '/' + item.sg + ';' + item.nm,
                                    category: item.tp,
                                    sq: 0,
                                    nmRegiao: item.sb
                                };
                            }));
                        } else {
                            response([{label: ___('nenhumaOrigemEncontrada'), id: ""}]);
                        }

                    },
                    autoFocus: true,
                    minLength: 3,
                    showCategory: true,
                    select: function (event, ui) {
                        var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                        origem.val(ui.item.id + nmRegiao);
                        inputComplementoO.val(ui.item.label + nmRegiao);
                        if (inputMostraCodigoOri) {
                            var valMostraCodigo = ui.item.id + nmRegiao;
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigoOri.html(valMostraCodigo[0]);
                        }
                        return false;
                    }
                }).keyup(function (e) {
                    if (e.which == 8 || e.which == 46) {
                        origem.val('');
                    }
                }).blur(function () {
                    if (origem.val().length < 3) {
                        inputComplementoO.val('');
                    }
                }).val(vlOrigem);
                if (origem.attr("autocorrect")) {
                    inputComplementoO.attr('autocorrect', origem.attr("autocorrect"));
                }
                if (origem.attr("spellcheck")) {
                    inputComplementoO.attr('spellcheck', origem.attr("spellcheck"));
                }
                if (origem.attr("spellcheck")) {
                    inputComplementoO.attr('autocomplete', origem.attr("autocomplete"));
                }
            }
            origem.hide();

            var destinoDiff = ithis.find('.destinoDiff');
            var stDestinoDiff = ithis.find('.stDestinoDiff');
            if (destinoDiff) {
                var stDisabled = destinoDiff.attr('disabled');
                var inputComplementoDiff = itjq(document.createElement("input")).attr("type", "text").attr("class", destinoDiff.attr("class")).attr("style", destinoDiff.attr('style')).attr('placeholder', destinoDiff.attr('placeholder'));
                if (typeof stDisabled != 'undefined' && stDisabled == 'disabled') {
                    inputComplementoDiff.attr('disabled', 'disabled');
                }
                destinoDiff.after(inputComplementoDiff);
                destinoDiff.attr('disabled');

                var vlDestinoDiff = destinoDiff.val();
                if (vlDestinoDiff && vlDestinoDiff.indexOf(';') > -1) {
                    vlDestinoDiff = vlDestinoDiff.split(';');
                    vlDestinoDiff = vlDestinoDiff[1];
                } else {
                    vlDestinoDiff = "";
                }

                inputComplementoDiff.itAutocompleteCat({
                    source: function (request, response) {

                        const result = pesquisarMotor(request.term, "M", SG_IDIOMA);

                        if (result && result.length > 0) {
                            response(itjq.map(result, function (item) {
                                return {
                                    label: item.nm,
                                    id: item.tp + item.id + ';' + item.nm,
                                    category: item.tp,
                                    sq: 0,
                                    nmRegiao: item.sb
                                };
                            }));
                        } else {
                            response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                        }
                    },
                    autoFocus: true,
                    minLength: 3,
                    showCategory: true,
                    select: function (event, ui) {
                        var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                        destinoDiff.val(ui.item.id + nmRegiao);
                        inputComplementoDiff.val(ui.item.label + nmRegiao);
                        return false;
                    }
                }).val(vlDestinoDiff);
                if (destinoDiff.attr("autocorrect")) {
                    inputComplementoDiff.attr('autocorrect', destinoDiff.attr("autocorrect"));
                }
                if (destinoDiff.attr("spellcheck")) {
                    inputComplementoDiff.attr('spellcheck', destinoDiff.attr("spellcheck"));
                }
                if (destinoDiff.attr("spellcheck")) {
                    inputComplementoDiff.attr('autocomplete', destinoDiff.attr("autocomplete"));
                }
                destinoDiff.hide();

                stDestinoDiff.on('change', function (e) {
                    var destinoDiff = stDestinoDiff.closest('.pnlMotor').find('.destinoDiff');
                    if (stDestinoDiff.is(':checked')) {
                        destinoDiff.removeAttr('disabled');
                    } else {
                        destinoDiff.attr('disabled', 'disabled');
                        destinoDiff.val('');
                    }
                });
            }

            var destino = ithis.find('.idDestino');
            var layoutBusca = null;

            function gerarDestino(data) {
                if (!optPd.stDestinoFixo) {
                    layoutBusca = data.layoutBusca;
                    var data = optPd.destino == null ? null : optPd.destino;
                    var inputComplementoD = itjq(document.createElement(layoutBusca.stDestinoAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).attr("style", destino.attr('style')).attr('placeholder', destino.attr('placeholder')).show();
                    destino.after(inputComplementoD);
                    var vlDestino = destino.val();
                    if (vlDestino && vlDestino.indexOf(';') > -1) {
                        vlDestino = vlDestino.split(';');
                        vlDestino = vlDestino[1];
                    } else {
                        vlDestino = "";
                    }
                    var inputMostraCodigo = null;
                    if (stMostraCodigo) {
                        inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplementoD.after(inputMostraCodigo);
                    }
                    if (!layoutBusca.stDestinoAutocompletar && data == null) {
                        inputComplementoD.val(___('nenhumDestinoEncontrado')).attr('readonly', 'readonly');
                    } else if (layoutBusca.stDestinoAutocompletar) {
                        inputComplementoD.itAutocompleteCat({
                            source: function (request, response) {

                                const result = pesquisarMotor(request.term, "A", SG_IDIOMA);

                                if (result && result.length > 0) {
                                    response(itjq.map(result, function (item) {
                                        return {
                                            label: item.nm,
                                            id: item.tp + item.id + '/' + item.sg + ';' + item.nm,
                                            category: item.tp,
                                            sq: 0,
                                            nmRegiao: item.sb
                                        };
                                    }));
                                } else {
                                    response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                                }

                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                destino.val(ui.item.id + nmRegiao);
                                inputComplementoD.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                return false;
                            }
                        }).val(vlDestino);
                        if (destino.attr("autocorrect")) {
                            inputComplementoD.attr('autocorrect', destino.attr("autocorrect"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplementoD.attr('spellcheck', destino.attr("spellcheck"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplementoD.attr('autocomplete', destino.attr("autocomplete"));
                        }
                    } else if (itjq(data).length == 1) {
                        destino.val(data[0].tp + data[0].id + '/' + data[0].sg + ';' + data[0].nm);
                        inputComplementoD.val(data[0].nm).attr('readonly', 'readonly');
                        if (stMostraCodigo) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigo.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplementoD.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplementoD.append(new Option(item.nm, item.tp + item.id + '/' + item.sg + ';' + item.nm));
                        });
                        inputComplementoD.change(function () {
                            destino.val(itjq(this).val());
                            if (inputMostraCodigo) {
                                var valMostraCodigo = destino.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigo.html(valMostraCodigo[0]);
                            }
                        });
                    }
                } else {
                    var inputComplemento = ithis.find('.it-destino-cp');
                    if (!inputComplemento.hasClass('it-destino-cp')) {
                        inputComplemento = itjq(document.createElement("input")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')).attr("readonly", "readonly");
                    }
                    var valDestino = destino.val();
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[1];
                    inputComplemento.val(valDestino);
                    destino.after(inputComplemento);
                }
            }

            destino.hide();
            var dtIni = ithis.find(".dtIni");
            var dtFim = ithis.find(".dtFim");
            geraQtNoite(dtIni);

            var pnlStVooBagagem = ithis.find(".pnlStVooBagagem");

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/pacote-dinamico/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        gerarDestino(data);
                        destino.append('<input />');
                        ithis.children().show();
                        ithis.find('.load').hide();
                        configQuarto(ithis, data.layoutBusca, optPd);
                        dateRage(dtIni, dtFim, data.layoutBusca);
                        opt.pacoteDinamico = {layoutBusca: data.layoutBusca};
                        if (!data.layoutBusca.stVooBagagemSel) {
                            pnlStVooBagagem.hide();
                        }
                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });


            btnPesquisa.click(function (e) {
                gerarPesquisa(e, 'pd', ithis, origem, destino, dtIni, dtFim, opt, null);
            });
        });
    };

    //
    //
    //
    // MOTOR PACOTE AEREO
    //
    //
    //

    this.motorPacoteAereo = function (id, optPa, stDestinoFixo, idPacote) {
        var parIdPacote = idPacote ? "&idPacote=" + (idPacote + "").replace('P', '') : "";
        var nmPath = null;
        var boo = typeof (opt) === "boolean" || !opt;
        if (boo) {
            optPa = {stOrigemFixo: opt ? opt : false};
        }

        optPa = Object.assign({}, {stOrigemFixo: false, stDestinoFixo: stDestinoFixo, destino: null}, optPa);
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var origem = ithis.find('.idOrigem');
            var destino = ithis.find('.idDestino');
            var dtIni = ithis.find(".dtIni");
            var valDtIni = dtIni.val();
            var valDtFim = null;

            geraQtNoite(dtIni);
            var dtFim = null;
            dtIni.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
            var dsPlaceholderDtIni = dtIni.attr('placeholder'), dsPlaceholderDtFim = null;
            var layoutBusca = null;

            function gerarOrigem(data) {
                layoutBusca = data.layoutBusca;
                dtFim = data && data.layoutBusca && data.layoutBusca.stDtRetorno ? ithis.find(".dtFim") : null;
                if (dtFim) {
                    dtFim.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
                    dsPlaceholderDtFim = dtFim.attr('placeholder');
                    valDtFim = dtFim.val();
                }
                if (optPa.stOrigemFixo) {
                    gerarDestino();
                } else {
                    data = data == null || data.origem == null ? null : data.origem;
                    var inputComplemento = itjq(document.createElement(layoutBusca.stOrigemAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", origem.attr("class")).attr("style", origem.attr('style')).attr('placeholder', origem.attr('placeholder'));
                    origem.after(inputComplemento);
                    var inputMostraCodigoOri = null;
                    if (stMostraCodigo) {
                        inputMostraCodigoOri = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplemento.after(inputMostraCodigoOri);
                    }
                    // origem.val('');
                    inputComplemento.val('');
                    origem.addClass('it-id');
                    if (layoutBusca.stOrigemAutocompletar) {
                        var vlOrigem = origem.val();
                        if (vlOrigem && vlOrigem.indexOf(';') > -1) {
                            vlOrigem = vlOrigem.split(';');
                            vlOrigem = vlOrigem[1];
                        } else {
                            vlOrigem = "";
                        }
                        var inputMostraCodigo = null;
                        if (stMostraCodigo) {
                            inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                            inputComplemento.after(inputMostraCodigo);
                        }
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {
                                itjq.ajax({
                                    url: nmPath,
                                    data: {nmOrigem: request.term},
                                    dataType: "json",
                                    success: function (data) {
                                        data = data == null || data.origem == null ? null : data.origem;
                                        if (data == null) {
                                            response([{label: "Nenhuma origem encontrado", id: ""}]);
                                        } else {
                                            response(itjq.map(data, function (item) {
                                                return {
                                                    label: item.nm,
                                                    id: item.tp + (item.tp.includes('E') ? '-' : '') + item.id + "#" + item.sg + ';' + item.nm,
                                                    category: item.tp,
                                                    sq: item.sq,
                                                    nmRegiao: item.sb
                                                };
                                            }));
                                        }
                                    }
                                });
                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                origem.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                if (ithis.find('.it-destino-cp')) {
                                    ithis.find('.it-destino-cp').remove();
                                }
                                gerarDestino();
                            }
                        }).keyup(function (e) {
                            if (e.which == 8 || e.which == 46) {
                                origem.val('');
                            }
                        }).blur(function () {
                            if (origem.val().length < 3) {
                                inputComplemento.val('');
                            }
                        }).val(vlOrigem);
                        if (origem.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', origem.attr("autocorrect"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', origem.attr("spellcheck"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', origem.attr("autocomplete"));
                        }
                    } else if (!layoutBusca.stOrigemAutocompletar && (data == null || itjq(data).length == 0)) {
                        inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readonly', 'readonly');
                    } else if (itjq(data).length == 1) {
                        origem.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + +data[0].id + "#" + data[0].sg + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (inputMostraCodigoOri) {
                            var valMostraCodigo = origem.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigoOri.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + "#" + item.sg + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            origem.val(itjq(this).val());
                            if (inputMostraCodigoOri) {
                                var valMostraCodigo = origem.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigoOri.html(valMostraCodigo[0]);
                            }
                            if (optPa.stOrigemFixo) {
                                destino.val("");
                            }
                            dtIni.datepicker('disable');
                            if (dtFim) {
                                dtFim.datepicker('disable');
                            }
                            if (ithis.find('.it-destino-cp')) {
                                ithis.find('.it-destino-cp').remove();
                            }
                            gerarDestino();
                        });
                    }
                    gerarDestino();
                }
                origem.hide();
            }

            function gerarDestino() {
                if (optPa.stDestinoFixo) {
                    var inputComplemento = ithis.find('.it-destino-cp');
                    if (!inputComplemento.hasClass('it-destino-cp')) {
                        inputComplemento = itjq(document.createElement("input")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')).attr("readonly", "readonly");
                    }
                    var valDestino = destino.val();
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[1];
                    inputComplemento.val(valDestino);
                    destino.after(inputComplemento);
                    gerarDtIni();
                } else {
                    var valOrigem = origem.val();
                    if (valOrigem != null && valOrigem.length > 0) {
                        valOrigem = valOrigem.split(';');
                        valOrigem = valOrigem[0];
                        if ("A" == valOrigem.substr(0, 1)) {
                            valOrigem = "&sgOrigem=" + valOrigem.substr(valOrigem.indexOf('#') + 1);
                        } else if ("M" == valOrigem.substr(0, 1)) {
                            valOrigem = "&idOrigem=" + valOrigem.substr(1, valOrigem.indexOf('#')).replace('#', '');
                        }
                        itjq.ajax({
                            url: nmPath + valOrigem,
                            dataType: "json",
                            success: function (data) {
                                data = optPa.destino == null ? (data == null || data.destino == null ? null : data.destino) : optPa.destino;
                                var inputComplemento = ithis.find('.it-destino-cp');
                                if (!inputComplemento.hasClass('it-destino-cp')) {
                                    inputComplemento = itjq(document.createElement(data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder'));
                                }
                                if (data == null) {
                                    inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readyonly');
                                } else if (itjq(data).length == 1) {
                                    destino.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + data[0].id + ';' + data[0].nm);
                                    inputComplemento.val(data[0].nm);
                                } else {
                                    inputComplemento.children().remove();
                                    inputComplemento.append(new Option(___('selecione'), ""));
                                    itjq.each(data, function (i, item) {
                                        inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                                    });
                                    inputComplemento.val("");
                                    inputComplemento.change(function () {
                                        dtIni.datepicker('disable');
                                        if (dtFim) {
                                            dtFim.datepicker('disable');
                                        }
                                        destino.val(itjq(this).val());
                                        if (inputMostraCodigoDes) {
                                            var valMostraCodigo = destino.val();
                                            valMostraCodigo = valMostraCodigo.split(';');
                                            inputMostraCodigoDes.html(valMostraCodigo[0]);
                                        }
                                        gerarDtIni();
                                    });
                                    if (destino.val()) {
                                        inputComplemento.val(destino.val());
                                    }
                                }
                                destino.after(inputComplemento);
                                var inputMostraCodigoDes = null;
                                if (stMostraCodigo) {
                                    inputMostraCodigoDes = itjq(document.createElement("div")).html(___('codigo') + '...');
                                    inputComplemento.after(inputMostraCodigoDes);
                                }
                                gerarDtIni();
                            }
                        });
                    } else {
                        destino.after(itjq(document.createElement("input")).attr("disabled", "disabled").attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')));
                    }
                }
                destino.hide();
            }

            function gerarDtIni() {
                dtIni.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
                if (valDtIni) {
                    dtIni.val(valDtIni);
                    valDtIni = null;
                }
                if (dtFim) {
                    dtFim.datepicker('disable').val('');
                    if (valDtFim) {
                        dtFim.val(valDtFim);
                        valDtFim = null;
                    }
                }
                var valOrigem = origem.val();
                if (valOrigem != null && valOrigem.length > 0) {
                    valOrigem = valOrigem.split(';');
                    valOrigem = valOrigem[0];
                    if ("A" == valOrigem.substr(0, 1)) {
                        valOrigem = "&sgOrigem=" + valOrigem.substr(valOrigem.indexOf('#') + 1);
                    } else if ("M" == valOrigem.substr(0, 1)) {
                        valOrigem = "&idOrigem=" + valOrigem.substr(1, valOrigem.indexOf('#')).replace('#', '');
                    }
                    valOrigem += "&stDtRetorno=" + (dtFim != null ? "S" : "N");
                }
                var valDestino = destino.val();
                var idDestino = valDestino;
                if (valDestino != null && valDestino.length > 0) {
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[0];
                    if (valDestino != null && valDestino.length > 0) {
                        valDestino = valDestino.split(';');
                        valDestino = valDestino[0];

                        var tpDestino = valDestino.substr(0, 1);
                        if (valDestino && valDestino.indexOf('-') > -1) {
                            idDestino = valDestino.split('-');
                            tpDestino = idDestino[0];
                            idDestino = idDestino[1];
                        } else {
                            idDestino = valDestino.substr(1);
                        }

                        valDestino = "&idDestino=" + idDestino + "&tpDestino=" + tpDestino;
                    }
                }
                dtIni.dados = null;
                if (valOrigem && valDestino) {
                    itjq.ajax({
                        url: nmPath + valOrigem + valDestino,
                        dataType: "json",
                        success: function (data) {
                            var stDtRetorno = opt.pacoteAereo.layoutBusca.stDtRetorno;
                            if (stDtRetorno) {
                                data = data == null || data.periodoList == null ? null : data.periodoList;
                            } else {
                                data = data == null || data.periodo == null || data.periodo.dtPeriodo == null ? null : data.periodo.dtPeriodo;
                            }
                            if (data == null) {
                                dtIni.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                            } else {
                                if (stDtRetorno) {
                                    data = data.sort(function (a, b) {
                                        if (a.dtPartida < b.dtPartida) {
                                            return -1;
                                        } else if (a.dtPartida > b.dtPartida) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                } else {
                                    data = data.sort(function (a, b) {
                                        if (a < b) {
                                            return -1;
                                        } else if (a > b) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                }
                                var dtLast = stDtRetorno ? data[data.length - 1].dtPartida.toString() : data[data.length - 1].toString();
                                var yyLast = dtLast.substr(0, 4);
                                var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                                var ddLast = dtLast.substr(6, 2);
                                if (ddLast.indexOf('0') === 0) {
                                    ddLast = ddLast.substr(1);
                                }
                                var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                                var dtMin = stDtRetorno ? data[0].dtPartida.toString() : data[0].toString();
                                var yyMin = dtMin.substr(0, 4);
                                var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                                var ddMin = 1;
                                var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                                dtIni.dados = data;
                                dtIni.datepicker('option', {
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    beforeShowDay: function (date) {
                                        var list = data;
                                        for (var i = 0; i < list.length; i++) {
                                            var dateTmp = stDtRetorno ? list[i].dtPartida.toString() : list[i].toString();
                                            var yy = dateTmp.substr(0, 4);
                                            var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                            var dd = dateTmp.substr(6, 2);
                                            if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                                return [true, 'calendario destacado'];
                                            }
                                        }
                                        return [false, ''];
                                    }
                                });
                                dtIni.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtIni);
                                if (dtIni.val()) {
                                    geraQtNoite(dtIni);
                                    var dt = dtIni.val().substr(6, 4) + (dtIni.val().substr(3, 2)) + dtIni.val().substr(0, 2);
                                    for (var i in dtIni.dados) {
                                        if (dt == dtIni.dados[i].dtPartida) {
                                            dtFim.dados = dtIni.dados[i].dtRetorno;
                                            break;
                                        }
                                    }
                                    gerarDtFim();
                                }
                            }
                        }
                    });
                    if (dtFim != null) {
                        dtIni.datepicker('option', 'onSelect', function (data) {
                            geraQtNoite(this);
                            var dt = data.substr(6, 4) + (data.substr(3, 2)) + data.substr(0, 2);
                            for (var i in dtIni.dados) {
                                if (dt == dtIni.dados[i].dtPartida) {
                                    dtFim.dados = dtIni.dados[i].dtRetorno;
                                    break;
                                }
                            }
                            gerarDtFim();
                        });
                    }
                } else {
                    dtIni.attr('placeholder', ___('favorSelecioneODestino')).val("");
                }
            }

            function gerarDtFim() {
                dtFim.datepicker('disable').attr('placeholder', ___('carregando') + '...');
                if (origem.val() == null || !origem.val() || destino.val() == null || !destino.val() || dtIni.val() == null || !dtIni.val()) {
                    dtFim.val('');
                }
                if (dtFim.dados) {
                    var dados = dtFim.dados;
                    if (dados == null) {
                        dtFim.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                    } else {
                        dados = dados.sort(function (a, b) {
                            if (a < b) {
                                return -1;
                            } else if (a > b) {
                                return 1;
                            }
                            return 0;
                        });
                        var dtLast = dados[dados.length - 1].toString();
                        var yyLast = dtLast.substr(0, 4);
                        var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                        var ddLast = dtLast.substr(6, 2);
                        if (ddLast.indexOf('0') === 0) {
                            ddLast = ddLast.substr(1);
                        }
                        var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                        var dtMin = dados[0].toString();
                        var yyMin = dtMin.substr(0, 4);
                        var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                        var ddMin = 1;
                        var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                        dtFim.datepicker('option', {
                            minDate: minDate,
                            maxDate: maxDate,
                            beforeShowDay: function (date) {
                                var list = dados;
                                for (var i = 0; i < list.length; i++) {
                                    var dateTmp = list[i].toString();
                                    var yy = dateTmp.substr(0, 4);
                                    var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                    var dd = dateTmp.substr(6, 2);
                                    if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                        return [true, 'calendario destacado'];
                                    }
                                }
                                return [false, ''];
                            },
                            onSelect: function (data) {
                                geraQtNoite(this);
                            }
                        });
                        if (itjq(dados).length == 1) {
                            dtFim.val(dtMin.substr(6, 2) + '/' + dtMin.substr(4, 2) + '/' + yyMin);
                            geraQtNoite(dtFim);
                        }
                        dtFim.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtFim);
                    }

                } else {
                    dtFim.attr('placeholder', ___('favorSelecioneORetorno')).val("");
                }
            }

            var pnlStVooBagagem = ithis.find(".pnlStVooBagagem");

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/pacote-fechado/' + chave,
                success: function (data) {

                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        nmPath = urlMotorInfotravel + "motor/pacote-fechado/?sgIdioma=" + SG_IDIOMA + parIdPacote;

                        itjq.ajax({
                            url: nmPath,
                            dataType: "json",
                            success: function (dataO) {
                                if (dataO) {
                                    data.origem = dataO.origem;
                                    opt.pacoteAereo = {layoutBusca: data.layoutBusca};
                                    gerarOrigem(data);
                                    ithis.children().show();
                                    ithis.find('.load').hide();
                                    configQuarto(ithis, data.layoutBusca, optPa);

                                }
                            }
                        });

                        if (!data.layoutBusca.stVooBagagemSel) {
                            pnlStVooBagagem.hide();
                        }
                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }
                , error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });
            btnPesquisa.click(function (e) {
                gerarPesquisa(e, "pa", ithis, origem, destino, dtIni, dtFim, opt, idPacote);
            });
        });
    };

    //
    //
    //
    // MOTOR RODO SERVIÃ‡O
    //
    //
    //

    this.motorRodoServico = function (id, optRs, stDestinoFixo) {
        optRs = Object.assign({}, {
            stOrigemFixo: false,
            stDestinoFixo: stDestinoFixo,
            destino: null,
            idPacote: null
        }, optRs);
        var parIdPacote = optRs.idPacote == null ? '' : '&idPacote=' + (optRs.idPacote + "").replace('P', '');
        var nmPath = null;
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var origem = ithis.find('.idOrigem');
            var destino = ithis.find('.idDestino');
            var dtIni = ithis.find(".dtIni");
            var valDtIni = dtIni.val();

            geraQtNoite(dtIni);
            dtIni.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
            var dsPlaceholderDtIni = dtIni.attr('placeholder');
            var layoutBusca = null;

            function gerarOrigem(data) {
                if (optRs.stOrigemFixo) {
                    gerarDestino();
                } else {
                    layoutBusca = data.layoutBusca;
                    data = data == null || data.origem == null ? null : data.origem;
                    var inputComplemento = itjq(document.createElement(layoutBusca.stOrigemAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", origem.attr("class")).attr("style", origem.attr('style')).attr('placeholder', origem.attr('placeholder'));
                    origem.after(inputComplemento);
                    var inputMostraCodigoOri = null;
                    if (stMostraCodigo) {
                        inputMostraCodigoOri = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplemento.after(inputMostraCodigoOri);
                    }
                    //origem.val('');
                    inputComplemento.val('');
                    if (layoutBusca.stOrigemAutocompletar) {
                        var vlOrigem = origem.val();
                        if (vlOrigem && vlOrigem.indexOf(';') > -1) {
                            vlOrigem = vlOrigem.split(';');
                            vlOrigem = vlOrigem[1];
                        } else {
                            vlOrigem = "";
                        }
                        var inputMostraCodigo = null;
                        if (stMostraCodigo) {
                            inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                            inputComplemento.after(inputMostraCodigo);
                        }
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {
                                itjq.ajax({
                                    url: nmPath,
                                    data: {nmOrigem: request.term},
                                    dataType: "json",
                                    success: function (data) {
                                        data = data == null || data.origem == null ? null : data.origem;
                                        if (data == null) {
                                            response([{label: "Nenhuma origem encontrado", id: ""}]);
                                        } else {
                                            response(itjq.map(data, function (item) {
                                                return {
                                                    label: item.nm,
                                                    id: item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm,
                                                    category: item.tp,
                                                    sq: item.sq,
                                                    nmRegiao: item.sb
                                                };
                                            }));
                                        }
                                    }
                                });
                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                origem.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                if (ithis.find('.it-destino-cp')) {
                                    ithis.find('.it-destino-cp').remove();
                                }
                                gerarDestino();
                            }
                        }).val(vlOrigem);
                        if (origem.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', origem.attr("autocorrect"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', origem.attr("spellcheck"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', origem.attr("autocomplete"));
                        }
                    } else if (!layoutBusca.stOrigemAutocompletar && (data == null || itjq(data).length == 0)) {
                        inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readonly', 'readonly');
                    } else if (itjq(data).length == 1) {
                        origem.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + data[0].id + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (inputMostraCodigoOri) {
                            var valMostraCodigo = origem.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigoOri.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            origem.val(itjq(this).val());
                            if (inputMostraCodigoOri) {
                                var valMostraCodigo = origem.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigoOri.html(valMostraCodigo[0]);
                            }
                            if (optRs.stOrigemFixo) {
                                destino.val("");
                            }
                            dtIni.datepicker('disable');
                            if (ithis.find('.it-destino-cp')) {
                                ithis.find('.it-destino-cp').remove();
                            }
                            gerarDestino();
                        });
                    }
                    gerarDestino();
                }
                origem.hide();
            }

            function gerarDestino() {
                if (optRs.stDestinoFixo) {
                    gerarDtIni();
                } else {
                    var valOrigem = origem.val().trim();
                    if (valOrigem != null && valOrigem.length > 0) {
                        valOrigem = valOrigem.split(';');
                        valOrigem = "&idOrigem=" + valOrigem[0].substr(1);
                        itjq.ajax({
                            url: nmPath + valOrigem,
                            dataType: "json",
                            success: function (data) {
                                data = data == null || data.destino == null ? null : data.destino;
                                var inputComplemento = ithis.find('.it-destino-cp');
                                if (!inputComplemento.hasClass('it-destino-cp')) {
                                    inputComplemento = itjq(document.createElement(data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder'));
                                }
                                if (data == null) {
                                    inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readyonly');
                                } else if (itjq(data).length == 1) {
                                    destino.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + data[0].id + ';' + data[0].nm);
                                    inputComplemento.val(data[0].nm);
                                } else {
                                    inputComplemento.children().remove();
                                    inputComplemento.append(new Option(___('selecione'), ""));
                                    itjq.each(data, function (i, item) {
                                        inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                                    });
                                    inputComplemento.val("");
                                    inputComplemento.change(function () {
                                        dtIni.datepicker('disable');
                                        destino.val(itjq(this).val());
                                        if (inputMostraCodigoDes) {
                                            var valMostraCodigo = destino.val();
                                            valMostraCodigo = valMostraCodigo.split(';');
                                            inputMostraCodigoDes.html(valMostraCodigo[0]);
                                        }
                                        gerarDtIni();
                                    });
                                    if (destino.val()) {
                                        inputComplemento.val(destino.val());
                                    }
                                }
                                destino.after(inputComplemento);
                                var inputMostraCodigoDes = null;
                                if (stMostraCodigo) {
                                    inputMostraCodigoDes = itjq(document.createElement("div")).html(___('codigo') + '...');
                                    inputComplemento.after(inputMostraCodigoDes);
                                }
                                gerarDtIni();
                            }
                        });
                    } else {
                        destino.after(itjq(document.createElement("input")).attr("disabled", "disabled").attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')));
                    }
                }
                destino.hide();
            }

            function gerarDtIni() {
                dtIni.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
                if (valDtIni) {
                    dtIni.val(valDtIni);
                    valDtIni = null;
                }
                var valOrigem = origem.val().trim();
                if (valOrigem != null && valOrigem.length > 0) {
                    valOrigem = valOrigem.split(';');
                    valOrigem = valOrigem[0];
                    valOrigem = "&idOrigem=" + valOrigem.substr(1);
                }
                var valDestino = destino.val().trim();
                var idDestino = valDestino;
                if (valDestino != null && valDestino.length > 0) {
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[0];

                    var tpDestino = valDestino.substr(0, 1);
                    if (valDestino && valDestino.indexOf('-') > -1) {
                        idDestino = valDestino.split('-');
                        tpDestino = idDestino[0];
                        idDestino = idDestino[1];
                    } else {
                        idDestino = valDestino.substr(1);
                    }

                    valDestino = "&idDestino=" + idDestino + "&tpDestino=" + tpDestino;
                }
                if (valOrigem && valDestino) {
                    itjq.ajax({
                        url: nmPath + valOrigem + valDestino,
                        dataType: "json",
                        success: function (data) {
                            data = data == null || data.periodo == null || data.periodo.dtPeriodo == null ? null : data.periodo.dtPeriodo;
                            if (data == null) {
                                dtIni.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                            } else {
                                data = data.sort(function (a, b) {
                                    if (a < b) {
                                        return -1;
                                    } else if (a > b) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                var dtLast = data[data.length - 1].toString();
                                var yyLast = dtLast.substr(0, 4);
                                var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                                var ddLast = dtLast.substr(6, 2);
                                if (ddLast.indexOf('0') === 0) {
                                    ddLast = ddLast.substr(1);
                                }
                                var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                                var dtMin = data[0].toString();
                                var yyMin = dtMin.substr(0, 4);
                                var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                                var ddMin = 1;
                                var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                                dtIni.datepicker('option', {
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    beforeShowDay: function (date) {
                                        var list = data;
                                        for (var i = 0; i < list.length; i++) {
                                            var dateTmp = list[i].toString();
                                            var yy = dateTmp.substr(0, 4);
                                            var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                            var dd = dateTmp.substr(6, 2);
                                            if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                                return [true, 'calendario destacado'];
                                            }
                                        }
                                        return [false, ''];
                                    },
                                    onSelect: function (data) {
                                        geraQtNoite(this);
                                    }
                                });
                                dtIni.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtIni);
                            }
                        }
                    });
                } else {
                    dtIni.attr('placeholder', ___('favorSelecioneODestino')).val("");
                }
            }

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/pacote-rodo-servico/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        nmPath = urlMotorInfotravel + "motor/pacote-rodo-servico/?sgIdioma=" + SG_IDIOMA + parIdPacote;

                        itjq.ajax({
                            url: nmPath,
                            dataType: "json",
                            success: function (dataO) {
                                if (dataO) {
                                    data.origem = dataO.origem;
                                    opt.rodoServico = {layoutBusca: data.layoutBusca};
                                    gerarOrigem(data);
                                    ithis.children().show();
                                    ithis.find('.load').hide();
                                    configQuarto(ithis, data.layoutBusca);

                                }
                            }
                        });

                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });

            btnPesquisa.click(function (e) {
                gerarPesquisa(e, "prs", ithis, origem, destino, dtIni, null, opt, optRs.idPacote);
            });
        });
    };

    //
    //
    //
    // MOTOR RODO HOTEL
    //
    //
    //

    this.motorRodoHotel = function (id, optRh) {
        optRh = Object.assign({}, {
            stOrigemFixo: false,
            stDestinoFixo: false,
            destino: null,
            idPacote: null
        }, optRh);
        var parIdPacote = optRh.idPacote == null ? '' : '&idPacote=' + (optRh.idPacote + "").replace('P', '');
        var nmPath = null;
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var origem = ithis.find('.idOrigem');
            var destino = ithis.find('.idDestino');
            var dtIni = ithis.find(".dtIni");
            var valDtIni = dtIni.val();
            var valDtFim = null;

            geraQtNoite(dtIni);
            dtIni.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
            var dsPlaceholderDtIni = dtIni.attr('placeholder');
            var layoutBusca = null;

            function gerarOrigem(data) {
                if (optRh.stOrigemFixo) {
                    gerarDestino();
                } else {
                    layoutBusca = data.layoutBusca;
                    data = data == null || data.origem == null ? null : data.origem;
                    var inputComplemento = itjq(document.createElement(layoutBusca.stOrigemAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", origem.attr("class")).attr("style", origem.attr('style')).attr('placeholder', origem.attr('placeholder'));
                    origem.after(inputComplemento);
                    var inputMostraCodigoOri = null;
                    if (stMostraCodigo) {
                        inputMostraCodigoOri = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplemento.after(inputMostraCodigoOri);
                    }
                    //origem.val('');
                    inputComplemento.val('');
                    if (layoutBusca.stOrigemAutocompletar) {
                        var vlOrigem = origem.val();
                        if (vlOrigem && vlOrigem.indexOf(';') > -1) {
                            vlOrigem = vlOrigem.split(';');
                            vlOrigem = vlOrigem[1];
                        } else {
                            vlOrigem = "";
                        }
                        var inputMostraCodigo = null;
                        if (stMostraCodigo) {
                            inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                            inputComplemento.after(inputMostraCodigo);
                        }
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {
                                itjq.ajax({
                                    url: nmPath,
                                    data: {nmOrigem: request.term},
                                    dataType: "json",
                                    success: function (data) {
                                        data = data == null || data.origem == null ? null : data.origem;
                                        if (data == null) {
                                            response([{label: "Nenhuma origem encontrado", id: ""}]);
                                        } else {
                                            response(itjq.map(data, function (item) {
                                                return {
                                                    label: item.nm,
                                                    id: item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm,
                                                    category: item.tp,
                                                    sq: item.sq,
                                                    nmRegiao: item.sb
                                                };
                                            }));
                                        }
                                    }
                                });
                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                origem.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                if (ithis.find('.it-destino-cp')) {
                                    ithis.find('.it-destino-cp').remove();
                                }
                                gerarDestino();
                            }
                        }).val(vlOrigem);
                        if (origem.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', origem.attr("autocorrect"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', origem.attr("spellcheck"));
                        }
                        if (origem.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', origem.attr("autocomplete"));
                        }
                    } else if (!layoutBusca.stOrigemAutocompletar && (data == null || itjq(data).length == 0)) {
                        inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readonly', 'readonly');
                    } else if (itjq(data).length == 1) {
                        origem.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + data[0].id + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (inputMostraCodigoOri) {
                            var valMostraCodigo = origem.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigoOri.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            origem.val(itjq(this).val());
                            if (inputMostraCodigoOri) {
                                var valMostraCodigo = origem.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigoOri.html(valMostraCodigo[0]);
                            }
                            if (optRh.stOrigemFixo) {
                                destino.val("");
                            }
                            dtIni.datepicker('disable');
                            if (ithis.find('.it-destino-cp')) {
                                ithis.find('.it-destino-cp').remove();
                            }
                            gerarDestino();
                        });
                    }
                    gerarDestino();
                }
                origem.hide();
            }

            function gerarDestino() {
                if (optRh.stDestinoFixo) {
                    gerarDtIni();
                } else {
                    var valOrigem = origem.val().trim();
                    if (valOrigem != null && valOrigem.length > 0) {
                        valOrigem = valOrigem.split(';');
                        valOrigem = "&idOrigem=" + valOrigem[0].substr(1);
                        itjq.ajax({
                            url: nmPath + valOrigem,
                            dataType: "json",
                            success: function (data) {
                                data = data == null || data.destino == null ? null : data.destino;
                                var inputComplemento = ithis.find('.it-destino-cp');
                                if (!inputComplemento.hasClass('it-destino-cp')) {
                                    inputComplemento = itjq(document.createElement(data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder'));
                                }
                                if (data == null) {
                                    inputComplemento.val(___('nenhumaOrigemEncontrada')).attr('readyonly');
                                } else if (itjq(data).length == 1) {
                                    destino.val(data[0].tp + (data[0].tp.includes('E') ? '-' : '') + data[0].id + ';' + data[0].nm);
                                    inputComplemento.val(data[0].nm);
                                } else {
                                    inputComplemento.children().remove();
                                    inputComplemento.append(new Option(___('selecione'), ""));
                                    itjq.each(data, function (i, item) {
                                        inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                                    });
                                    inputComplemento.val("");
                                    inputComplemento.change(function () {
                                        dtIni.datepicker('disable');
                                        destino.val(itjq(this).val());
                                        if (inputMostraCodigoDes) {
                                            var valMostraCodigo = destino.val();
                                            valMostraCodigo = valMostraCodigo.split(';');
                                            inputMostraCodigoDes.html(valMostraCodigo[0]);
                                        }
                                        gerarDtIni();
                                    });
                                    if (destino.val()) {
                                        inputComplemento.val(destino.val());
                                    }
                                }
                                destino.after(inputComplemento);
                                var inputMostraCodigoDes = null;
                                if (stMostraCodigo) {
                                    inputMostraCodigoDes = itjq(document.createElement("div")).html(___('codigo') + '...');
                                    inputComplemento.after(inputMostraCodigoDes);
                                }
                                gerarDtIni();
                            }
                        });
                    } else {
                        destino.after(itjq(document.createElement("input")).attr("disabled", "disabled").attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')));
                    }
                }
                destino.hide();
            }

            function gerarDtIni() {
                dtIni.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
                if (valDtIni) {
                    dtIni.val(valDtIni);
                    valDtIni = null;
                }

                var valOrigem = origem.val();
                if (valOrigem != null && valOrigem.length > 0) {
                    valOrigem = valOrigem.split(';');
                    valOrigem = valOrigem[0];
                    valOrigem = "&idOrigem=" + valOrigem.substr(1);
                }
                var valDestino = destino.val();
                var idDestino = valDestino;
                if (valDestino != null && valDestino.length > 0) {
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[0];

                    var tpDestino = valDestino.substr(0, 1);
                    if (valDestino && valDestino.indexOf('-') > -1) {
                        idDestino = valDestino.split('-');
                        tpDestino = idDestino[0];
                        idDestino = idDestino[1];
                    } else {
                        idDestino = valDestino.substr(1);
                    }

                    valDestino = "&idDestino=" + idDestino + "&tpDestino=" + tpDestino;
                }
                if (valOrigem && valDestino) {
                    itjq.ajax({
                        url: nmPath + valOrigem + valDestino,
                        dataType: "json",
                        success: function (data) {
                            data = data == null || data.periodo == null || data.periodo.dtPeriodo == null ? null : data.periodo.dtPeriodo;
                            if (data == null) {
                                dtIni.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                            } else {
                                data = data.sort(function (a, b) {
                                    if (a < b) {
                                        return -1;
                                    } else if (a > b) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                var dtLast = data[data.length - 1].toString();
                                var yyLast = dtLast.substr(0, 4);
                                var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                                var ddLast = dtLast.substr(6, 2);
                                if (ddLast.indexOf('0') === 0) {
                                    ddLast = ddLast.substr(1);
                                }
                                var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                                var dtMin = data[0].toString();
                                var yyMin = dtMin.substr(0, 4);
                                var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                                var ddMin = 1;
                                var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                                dtIni.datepicker('option', {
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    beforeShowDay: function (date) {
                                        var list = data;
                                        for (var i = 0; i < list.length; i++) {
                                            var dateTmp = list[i].toString();
                                            var yy = dateTmp.substr(0, 4);
                                            var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                            var dd = dateTmp.substr(6, 2);
                                            if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                                return [true, 'calendario destacado'];
                                            }
                                        }
                                        return [false, ''];
                                    },
                                    onSelect: function (data) {
                                        geraQtNoite(this);
                                    }
                                });
                                dtIni.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtIni);
                            }
                        }
                    });
                } else {
                    dtIni.attr('placeholder', ___('favorSelecioneODestino')).val("");
                }
            }

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/pacote-rodo-servico/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        nmPath = urlMotorInfotravel + "motor/pacote-rodo-hotel/?sgIdioma=" + SG_IDIOMA + parIdPacote;

                        itjq.ajax({
                            url: nmPath,
                            dataType: "json",
                            success: function (dataO) {
                                if (dataO) {
                                    data.origem = dataO.origem;
                                    opt.rodoHotel = {layoutBusca: data.layoutBusca};
                                    gerarOrigem(data);
                                    ithis.children().show();
                                    ithis.find('.load').hide();
                                    configQuarto(ithis, data.layoutBusca);

                                }
                            }
                        });

                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });

            btnPesquisa.click(function (e) {
                gerarPesquisa(e, "prh", ithis, origem, destino, dtIni, null, opt, optRh.idPacote);
            });
        });
    };

    //
    //
    //
    // MOTOR PACOTE HOTEL
    //
    //
    //

    this.motorPacoteHotel = function (id, stDestinoFixo, idPacote, optPh) {
        optPh = Object.assign({}, {
            stOrigemFixo: false,
            stDestinoFixo: false,
            destino: null,
            idPacote: null
        }, optPh);
        var parIdPacote = idPacote == null ? '' : '&idPacote=' + (idPacote + "").replace('P', '');
        var nmPath = null;
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var destino = ithis.find('.idDestino');
            var dtIni = ithis.find(".dtIni");
            var valDtIni = dtIni.val();
            var valDtFim = null;
            geraQtNoite(dtIni);
            var dtFim = null;
            dtIni.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
            var dsPlaceholderDtIni = dtIni.attr('placeholder'), dsPlaceholderDtFim = null;
            var layoutBusca = null;

            function gerarDestino(data) {
                layoutBusca = data.layoutBusca;
                dtFim = layoutBusca && layoutBusca.stDtRetorno ? ithis.find(".dtFim") : null;
                if (dtFim) {
                    dtFim.datepicker(itjq.datepicker.regional['pt-BR']).datepicker('disable');
                    dsPlaceholderDtFim = dtFim.attr('placeholder');
                    valDtFim = dtFim.val();
                }
                if (stDestinoFixo) {
                    var inputComplemento = ithis.find('.it-destino-cp');
                    if (!inputComplemento.hasClass('it-destino-cp')) {
                        inputComplemento = itjq(document.createElement("input")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')).attr("readonly", "readonly");
                    }
                    var valDestino = destino.val();
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[1];
                    inputComplemento.val(valDestino);
                    destino.after(inputComplemento);
                    gerarDtIni();
                } else {
                    layoutBusca = data.layoutBusca;
                    data = data == null || data.destino == null ? null : data.destino;
                    var inputComplemento = itjq(document.createElement(layoutBusca.stDestinoAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).attr("style", destino.attr('style')).attr('placeholder', destino.attr('placeholder'));
                    destino.after(inputComplemento);
                    var inputMostraCodigoDes = null;
                    if (stMostraCodigo) {
                        inputMostraCodigoDes = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplemento.after(inputMostraCodigoDes);
                    }
                    //destino.val('');
                    inputComplemento.val('');
                    if (layoutBusca.stDestinoAutocompletar) {
                        var vlDestino = destino.val();
                        if (vlDestino && vlDestino.indexOf(';') > -1) {
                            vlDestino = vlDestino.split(';');
                            vlDestino = vlDestino[1];
                            valDestino = "&idDestino=" + valDestino.substr(1) + "&tpDestino=" + valDestino.substr(0, 1);
                        } else {
                            valDestino = "";
                        }
                        var inputMostraCodigo = null;
                        if (stMostraCodigo) {
                            inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                            inputComplemento.after(inputMostraCodigo);
                        }
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {
                                itjq.ajax({
                                    url: nmPath + valDestino,
                                    dataType: "json",
                                    success: function (data) {
                                        data = data == null || data.destino == null ? null : data.destino;
                                        if (data == null) {
                                            response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                                        } else {
                                            response(itjq.map(data, function (item) {
                                                return {
                                                    label: item.nm,
                                                    id: item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm,
                                                    category: item.tp,
                                                    sq: item.sq,
                                                    nmRegiao: item.sb
                                                };
                                            }));
                                        }
                                    }
                                });
                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                destino.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                                gerarDtIni();
                            }
                        }).val(vlDestino);
                        if (destino.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', destino.attr("autocorrect"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', destino.attr("spellcheck"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', destino.attr("autocomplete"));
                        }
                    } else if (!layoutBusca.stDestinoAutocompletar && (data == null || itjq(data).length == 0)) {
                        inputComplemento.val(___('nenhumDestinoEncontrado')).attr('readonly', 'readonly');
                    } else if (itjq(data).length == 1) {
                        destino.val(data[0].tp + data[0].id + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (inputMostraCodigoDes) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigoDes.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + (item.tp.includes('E') ? '-' : '') + item.id + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            destino.val(itjq(this).val());
                            if (inputMostraCodigoDes) {
                                var valMostraCodigo = destino.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigoDes.html(valMostraCodigo[0]);
                            }
                            if (stDestinoFixo) {
                                destino.val("");
                            }
                            dtIni.datepicker('disable');
                            if (dtFim) {
                                dtFim.datepicker('disable');
                            }
                            if (ithis.find('.it-destino-cp')) {
                                ithis.find('.it-destino-cp').remove();
                            }
                            gerarDtIni();
                        });
                    }
                    gerarDtIni();
                }
                destino.hide();
            }

            function gerarDtIni() {
                dtIni.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
                if (valDtIni) {
                    dtIni.val(valDtIni);
                    valDtIni = null;
                }
                if (dtFim) {
                    dtFim.datepicker('disable').val('');
                    if (valDtFim) {
                        dtFim.val(valDtFim);
                        valDtFim = null;
                    }
                }
                var valDestino = destino.val();
                var idDestino = valDestino;
                if (valDestino != null && valDestino.length > 0) {
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[0];

                    var tpDestino = valDestino.substr(0, 1);
                    if (valDestino && valDestino.indexOf('-') > -1) {
                        idDestino = valDestino.split('-');
                        tpDestino = idDestino[0];
                        idDestino = idDestino[1];
                    } else {
                        idDestino = valDestino.substr(1);
                    }

                    valDestino = "&idDestino=" + idDestino + "&tpDestino=" + tpDestino;
                    valDestino += "&stDtRetorno=" + (dtFim != null ? "S" : "N");
                }

                if (valDestino) {
                    itjq.ajax({
                        url: nmPath + valDestino,
                        dataType: "json",
                        success: function (data) {
                            if (dtFim != null) {
                                data = data == null || data.periodoList == null ? null : data.periodoList;
                            } else {
                                data = data == null || data.periodo == null || data.periodo.dtPeriodo == null ? null : data.periodo.dtPeriodo;
                            }
                            if (data == null) {
                                dtIni.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                            } else {
                                if (dtFim != null) {

                                    data = data.sort(function (a, b) {
                                        if (a.dtPartida < b.dtPartida) {
                                            return -1;
                                        } else if (a.dtPartida > b.dtPartida) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                } else {
                                    data = data.sort(function (a, b) {
                                        if (a < b) {
                                            return -1;
                                        } else if (a > b) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                }
                                var dtLast = dtFim != null ? data[data.length - 1].dtPartida.toString() : data[data.length - 1].toString();
                                var yyLast = dtLast.substr(0, 4);
                                var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                                var ddLast = dtLast.substr(6, 2);
                                if (ddLast.indexOf('0') === 0) {
                                    ddLast = ddLast.substr(1);
                                }
                                var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                                var dtMin = dtFim != null ? data[0].dtPartida : data[0];
                                var yyMin = dtMin.substr(0, 4);
                                var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                                var ddMin = 1;
                                var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                                dtIni.dados = data;
                                dtIni.datepicker('option', {
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    beforeShowDay: function (date) {
                                        var list = data;
                                        for (var i = 0; i < list.length; i++) {
                                            var dateTmp = dtFim != null ? list[i].dtPartida.toString() : list[i].toString();
                                            var yy = dateTmp.substr(0, 4);
                                            var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                            var dd = dateTmp.substr(6, 2);
                                            if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                                return [true, 'calendario destacado'];
                                            }
                                        }
                                        return [false, ''];
                                    }
                                });
                                dtIni.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtIni);
                            }
                        }
                    });
                    if (dtFim != null) {
                        dtIni.datepicker('option', 'onSelect', function (data) {
                            geraQtNoite(this);
                            var dt = data.substr(6, 4) + (data.substr(3, 2)) + data.substr(0, 2);
                            for (var i in dtIni.dados) {
                                if (dt == dtIni.dados[i].dtPartida) {
                                    dtFim.dados = dtIni.dados[i].dtRetorno;
                                    break;
                                }
                            }
                            gerarDtFim();
                        });
                    }
                } else {
                    dtIni.attr('placeholder', ___('favorSelecioneODestino')).val("");
                }
            }

            function gerarDtFim() {
                dtFim.datepicker('disable').val('').attr('placeholder', ___('carregando') + '...');
                if (dtFim.dados) {
                    var dados = dtFim.dados;
                    if (dados == null) {
                        dtFim.val("").attr('readonly', 'readonly').attr('placeholder', ___('naoDisponivel'));
                    } else {
                        dados = dados.sort(function (a, b) {
                            if (a < b) {
                                return -1;
                            } else if (a > b) {
                                return 1;
                            }
                            return 0;
                        });
                        var dtLast = dados[dados.length - 1].toString();
                        var yyLast = dtLast.substr(0, 4);
                        var mmLast = parseInt(dtLast.substr(4, 2)) - 1;
                        var ddLast = dtLast.substr(6, 2);
                        if (ddLast.indexOf('0') === 0) {
                            ddLast = ddLast.substr(1);
                        }
                        var maxDate = new Date(yyLast, mmLast, ddLast, 1, 0, 0);
                        var dtMin = dados[0].toString();
                        var yyMin = dtMin.substr(0, 4);
                        var mmMin = parseInt(dtMin.substr(4, 2)) - 1;
                        var ddMin = 1;
                        var minDate = new Date(yyMin, mmMin, ddMin, 1, 0, 0);
                        dtFim.datepicker('option', {
                            minDate: minDate,
                            maxDate: maxDate,
                            beforeShowDay: function (date) {
                                var list = dados;
                                for (var i = 0; i < list.length; i++) {
                                    var dateTmp = list[i].toString();
                                    var yy = dateTmp.substr(0, 4);
                                    var mm = parseInt(dateTmp.substr(4, 2)) - 1;
                                    var dd = dateTmp.substr(6, 2);
                                    if (date.getDate() == dd && date.getMonth() == mm && date.getFullYear() == yy) {
                                        return [true, 'calendario destacado'];
                                    }
                                }
                                return [false, ''];
                            },
                            onSelect: function (data) {
                                geraQtNoite(this);
                            }
                        });
                        if (itjq(dados).length == 1) {
                            dtFim.val(dtMin.substr(6, 2) + '/' + dtMin.substr(4, 2) + '/' + yyMin);
                            geraQtNoite(dtFim);
                        }
                        dtFim.attr('readonly', 'readonly').datepicker('enable').attr('placeholder', dsPlaceholderDtFim);
                    }

                } else {
                    dtFim.attr('placeholder', ___('favorSelecioneORetorno')).val("");
                }
            }

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/pacote-hotel/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        nmPath = urlMotorInfotravel + "motor/pacote-hotel/?sgIdioma=" + SG_IDIOMA + parIdPacote;

                        itjq.ajax({
                            url: nmPath,
                            dataType: "json",
                            success: function (dataD) {
                                if (dataD) {
                                    data.destino = dataD.destino;
                                    opt.pacoteHotel = {layoutBusca: data.layoutBusca};
                                    gerarDestino(data);
                                    ithis.children().show();
                                    ithis.find('.load').hide();
                                    configQuarto(ithis, data.layoutBusca);

                                }
                            }
                        });

                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });
            btnPesquisa.click(function (e) {
                gerarPesquisa(e, "ph", ithis, null, destino, dtIni, dtFim, opt, idPacote);
            });
        });
    };

    //
    //
    //
    // MOTOR AEREO
    //
    //
    //

    this.motorAereo = function (id, optA, stDestinoFixo) {
        var nmPath = null;
        var boo = typeof (opt) === "boolean" || !opt;
        if (boo) {
            optA = {stOrigemFixo: opt ? opt : false};
        }
        optA = Object.assign({}, {
            stOrigemFixo: false,
            stDestinoFixo: stDestinoFixo,
            destino: null,
            passageiro: null
        }, optA);
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button,.pnlBotao a');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var origem = ithis.find('.idOrigem');
            var tpTrechoCheck = ithis.find('.pnlTpTrechoCheck input');
            var pnlDtFim = ithis.find('.pnlDtFim');
            tpTrechoCheck.click(function () {
                if (itjq(this).val() == 'ida') {
                    pnlDtFim.hide();
                } else {
                    pnlDtFim.show();
                }
            });
            if (!tpTrechoCheck.is(':checked')) {
                tpTrechoCheck.filter('[value=idaVolta]').prop('checked', true);
            }

            function gerarOrigem() {
                if (!optA.stOrigemFixo) {
                    var inputComplementoO = itjq(document.createElement("input")).attr("type", "text").attr("class", origem.attr("class")).attr("style", origem.attr('style')).attr('placeholder', origem.attr('placeholder'));
                    origem.after(inputComplementoO);
                    var vlOrigem = origem.val();
                    if (vlOrigem && vlOrigem.indexOf(';') > -1) {
                        vlOrigem = vlOrigem.split(';');
                        vlOrigem = vlOrigem[1];
                    } else {
                        vlOrigem = "";
                    }
                    var inputMostraCodigoOri = null;
                    if (stMostraCodigo) {
                        inputMostraCodigoOri = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplementoO.after(inputMostraCodigoOri);
                    }
                    inputComplementoO.itAutocompleteCat({
                        source: function (request, response) {
                            itjq.ajax({
                                url: nmPath,
                                data: {nmDestino: request.term},
                                dataType: "json",
                                success: function (data) {
                                    data = data == null || data.destino == null ? null : data.destino;
                                    if (data == null) {
                                        response([{label: ___('nenhumaOrigemEncontrada'), id: ""}]);
                                    } else {
                                        response(itjq.map(data, function (item) {
                                            return {
                                                label: item.nm,
                                                id: item.sg + ';' + item.nm,
                                                category: item.tp,
                                                sq: item.sq,
                                                nmRegiao: item.sb
                                            };
                                        }));
                                    }
                                }
                            });
                        },
                        autoFocus: true,
                        minLength: 3,
                        showCategory: true,
                        select: function (event, ui) {
                            var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                            origem.val(ui.item.id + nmRegiao);
                            inputComplementoO.val(ui.item.label + nmRegiao);
                            if (inputMostraCodigoOri) {
                                var valMostraCodigo = ui.item.id + nmRegiao;
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigoOri.html(valMostraCodigo[0]);
                            }
                        }
                    }).keyup(function (e) {
                        if (e.which == 8 || e.which == 46) {
                            origem.val('');
                        }
                    }).blur(function () {
                        if (origem.val().length < 3) {
                            inputComplementoO.val('');
                        }
                    }).val(vlOrigem);

                    if (origem.attr("autocorrect")) {
                        inputComplementoO.attr('autocorrect', origem.attr("autocorrect"));
                    }
                    if (origem.attr("spellcheck")) {
                        inputComplementoO.attr('spellcheck', origem.attr("spellcheck"));
                    }
                    if (origem.attr("spellcheck")) {
                        inputComplementoO.attr('autocomplete', origem.attr("autocomplete"));
                    }
                }
                origem.hide();
            }

            var destino = ithis.find('.idDestino');

            function gerarDestino() {
                if (!optA.stDestinoFixo) {
                    var data = optA.destino == null ? null : optA.destino;
                    var inputComplementoD = itjq(document.createElement(opt.aereo.layoutBusca.stDestinoAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).attr("style", destino.attr('style')).attr('placeholder', destino.attr('placeholder')).show();
                    destino.after(inputComplementoD);
                    var vlDestino = destino.val();
                    if (vlDestino && vlDestino.indexOf(';') > -1) {
                        vlDestino = vlDestino.split(';');
                        vlDestino = vlDestino[1];
                    } else {
                        vlDestino = "";
                    }
                    var inputMostraCodigo = null;
                    if (stMostraCodigo) {
                        inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplementoD.after(inputMostraCodigo);
                    }
                    if (!opt.aereo.layoutBusca.stDestinoAutocompletar && data == null) {
                        inputComplementoD.val(___('nenhumDestinoEncontrado')).attr('readonly', 'readonly');
                    } else if (opt.aereo.layoutBusca.stDestinoAutocompletar) {
                        inputComplementoD.itAutocompleteCat({
                            source: function (request, response) {
                                itjq.ajax({
                                    url: nmPath,
                                    data: {nmDestino: request.term},
                                    dataType: "json",
                                    success: function (data) {
                                        data = data == null || data.destino == null ? null : data.destino;
                                        if (data == null) {
                                            response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                                        } else {
                                            response(itjq.map(data, function (item) {
                                                return {
                                                    label: item.nm,
                                                    id: item.sg + ';' + item.nm,
                                                    category: item.tp,
                                                    sq: item.sq,
                                                    nmRegiao: item.sb
                                                };
                                            }));
                                        }
                                    }
                                });
                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                destino.val(ui.item.id + nmRegiao);
                                inputComplementoD.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                            }
                        }).val(vlDestino);
                        if (destino.attr("autocorrect")) {
                            inputComplementoD.attr('autocorrect', destino.attr("autocorrect"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplementoD.attr('spellcheck', destino.attr("spellcheck"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplementoD.attr('autocomplete', destino.attr("autocomplete"));
                        }
                    } else if (itjq(data).length == 1) {
                        destino.val(data[0].tp + data[0].id + '/' + data[0].sg + ';' + data[0].nm);
                        inputComplementoD.val(data[0].nm).attr('readonly', 'readonly');
                        if (stMostraCodigo) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigo.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplementoD.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplementoD.append(new Option(item.nm, item.tp + item.id + '/' + item.sg + ';' + item.nm));
                        });
                        inputComplementoD.change(function () {
                            destino.val(itjq(this).val());
                            if (inputMostraCodigo) {
                                var valMostraCodigo = destino.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigo.html(valMostraCodigo[0]);
                            }
                        });
                    }
                } else {
                    var inputComplemento = ithis.find('.it-destino-cp');
                    if (!inputComplemento.hasClass('it-destino-cp')) {
                        inputComplemento = itjq(document.createElement("input")).attr("type", "text").attr("class", destino.attr("class")).addClass('it-destino-cp').attr('placeholder', destino.attr('placeholder')).attr("readonly", "readonly");
                    }
                    var valDestino = destino.val();
                    valDestino = valDestino.split(';');
                    valDestino = valDestino[1];
                    inputComplemento.val(valDestino);
                    destino.after(inputComplemento);
                }
            }

            destino.hide();
            var dtIni = ithis.find(".dtIni");
            var dtFim = ithis.find(".dtFim");
            var pnlStVooBagagem = ithis.find(".pnlStVooBagagem");

            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/aereo/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        opt.aereo = {layoutBusca: data.layoutBusca};
                        nmPath = urlMotorInfotravel + "motor/aereo/?sgIdioma=" + SG_IDIOMA;
                        destino.append('<input />');
                        gerarOrigem();
                        gerarDestino();
                        ithis.children().show();
                        ithis.find('.load').hide();
                        configQuarto(ithis, data.layoutBusca, optA);
                        dateRage(dtIni, dtFim, data.layoutBusca);
                        if (!data.layoutBusca.stVooBagagemSel) {
                            pnlStVooBagagem.hide();
                        }
                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });
            btnPesquisa.click(function (e) {
                gerarPesquisa(e, 'a', ithis, origem, destino, dtIni, dtFim, opt, null);
            });
        });
    };

    //
    //
    //
    // MOTOR SERVIÃ‡O
    //
    //
    //

    this.motorServico = function (id, optS) {
        var boo = typeof (opt) === "boolean" || !opt;
        if (boo) {
            optS = {stDestinoFixo: opt ? opt : false};
        }
        optS = Object.assign({}, {
            stDestinoFixo: false,
            destino: null,
            stDataFixo: false,
            dataEspecial: null,
            quarto: null
        }, optS);
        itjq(function () {
            var ithis = itjq(id);
            ithis.children().hide();
            var btnPesquisa = ithis.find('.pnlBotao button,.pnlBotao a');
            ithis.append('<div class="load">' + ___('carregando') + '</div>');
            var destino = ithis.find('.idDestino');
            var layoutBusca = null;

            function gerarDestino(data) {
                if (!optS.stDestinoFixo) {
                    layoutBusca = data.layoutBusca;
                    data = optS.destino == null ? (data == null || data.destino == null ? null : data.destino) : optS.destino;
                    layoutBusca.stDestinoAutocompletar = optS.destino == null ? layoutBusca.stDestinoAutocompletar : false;

                    var inputComplemento = itjq(document.createElement(layoutBusca.stDestinoAutocompletar || data == null || itjq(data).length == 1 ? "input" : "select")).attr("type", "text").attr("class", destino.attr("class")).attr("style", destino.attr('style')).attr('placeholder', destino.attr('placeholder')).show();
                    destino.after(inputComplemento);
                    var vlDestino = destino.val();
                    if (vlDestino && vlDestino.indexOf(';') > -1) {
                        vlDestino = vlDestino.split(';');
                        vlDestino = vlDestino[1];
                    } else {
                        vlDestino = "";
                    }
                    var inputMostraCodigo = null;
                    if (stMostraCodigo) {
                        inputMostraCodigo = itjq(document.createElement("div")).html(___('codigo') + '...');
                        inputComplemento.after(inputMostraCodigo);
                    }
                    if (!layoutBusca.stDestinoAutocompletar && data == null) {
                        inputComplemento.val(___('nenhumDestinoEncontrado')).attr('readonly', 'readonly');
                    } else if (layoutBusca.stDestinoAutocompletar) {
                        inputComplemento.itAutocompleteCat({
                            source: function (request, response) {

                                const result = pesquisarMotor(request.term, "S", SG_IDIOMA);

                                if (result && result.length > 0) {
                                    response(itjq.map(result, function (item) {
                                        return {
                                            label: item.nm,
                                            id: item.tp + item.id + ';' + item.nm,
                                            category: item.tp,
                                            sq: 0,
                                            nmRegiao: item.sb
                                        };
                                    }));
                                } else {
                                    response([{label: ___('nenhumDestinoEncontrado'), id: ""}]);
                                }

                            },
                            autoFocus: true,
                            minLength: 3,
                            showCategory: true,
                            select: function (event, ui) {
                                var nmRegiao = ui.item.nmRegiao ? ' - ' + ui.item.nmRegiao : '';
                                destino.val(ui.item.id + nmRegiao);
                                inputComplemento.val(ui.item.label + nmRegiao);
                                if (inputMostraCodigo) {
                                    var valMostraCodigo = ui.item.id + nmRegiao;
                                    valMostraCodigo = valMostraCodigo.split(';');
                                    inputMostraCodigo.html(valMostraCodigo[0]);
                                }
                            }
                        }).val(vlDestino);
                        if (destino.attr("autocorrect")) {
                            inputComplemento.attr('autocorrect', destino.attr("autocorrect"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('spellcheck', destino.attr("spellcheck"));
                        }
                        if (destino.attr("spellcheck")) {
                            inputComplemento.attr('autocomplete', destino.attr("autocomplete"));
                        }
                    } else if (itjq(data).length == 1) {
                        destino.val(data[0].tp + data[0].id + ';' + data[0].nm);
                        inputComplemento.val(data[0].nm).attr('readonly', 'readonly');
                        if (stMostraCodigo) {
                            var valMostraCodigo = destino.val();
                            valMostraCodigo = valMostraCodigo.split(';');
                            inputMostraCodigo.html(valMostraCodigo[0]);
                        }
                    } else {
                        inputComplemento.append(new Option(___('selecione'), ""));
                        itjq.each(data, function (i, item) {
                            inputComplemento.append(new Option(item.nm, item.tp + item.id + ';' + item.nm));
                        });
                        inputComplemento.change(function () {
                            destino.val(itjq(this).val());
                            if (inputMostraCodigo) {
                                var valMostraCodigo = destino.val();
                                valMostraCodigo = valMostraCodigo.split(';');
                                inputMostraCodigo.html(valMostraCodigo[0]);
                            }
                        });
                    }
                }
            }

            destino.hide();
            var dtIni = ithis.find(".dtIni");
            var dtFim = ithis.find(".dtFim");
            geraQtNoite(dtIni);
            itjq.ajax({
                dataType: "json",
                url: urlMotorInfotravel + 'layout-busca/servico/' + chave,
                success: function (data) {
                    if (data !== null && data != null) {
                        data = {layoutBusca: data};
                        opt.servico = {layoutBusca: data.layoutBusca};
                        gerarDestino(data);
                        ithis.children().show();
                        ithis.find('.load').hide();
                        configQuarto(ithis, data.layoutBusca, optS);
                        data.layoutBusca.dataEspecial = optS.dataEspecial;
                        if (optS.dataEspecial) {
                            data.layoutBusca.dataEspecial.datas.forEach(function (obj) {
                                if (obj.semana) {
                                    obj.semana = obj.semana.replace('D', '1').replace('S', '7');
                                }
                            });
                        }
                        if (optS.stDataFixo) {
                            dtIni.attr('readonly', 'readonly');
                            dtFim.attr('readonly', 'readonly');
                        } else {
                            dateRage(dtIni, dtFim, data.layoutBusca);
                        }
                    } else {
                        ithis.find('.load').html(___('motorNaoDisponivel'));
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    ithis.find('.load').html(___('motorNaoDisponivel'));
                }
            });
            btnPesquisa.click(function (e) {
                gerarPesquisa(e, 's', ithis, null, destino, dtIni, dtFim, opt, null);
            });
        });
    };

};