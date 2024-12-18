const jsLoader = {
    socket: {
        host: "http://127.0.0.1:2578/loaderSocket",
        async send(event) {
            try {
                const response = await fetch(this.host, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: event
                });
                return await response.text();
            } catch (error) {
                return "error";
            }
        },
        async connectToSocket() {
            if (await jsLoader.socket.send("loaderConnection") != "error") {
                jsLoader.showConnectedScript("success", `loader module v${await jsLoader.socket.send("loaderGetVersion")}`, `Загружен | By ${await jsLoader.socket.send("loaderGetAuthor")}`);
                
            } else {
                jsLoader.showConnectedScript("warning", "loader module", "Не загружен");
            }
        }
    },
    log: {
      data: {
        scriptLogs: []
      },
      start() {
        document.addEventListener("keydown", _0xbae467 => {
          if (!_0xbae467.repeat) {
            if (_0xbae467.ctrlKey && _0xbae467.shiftKey && _0xbae467.keyCode == 76) {
              this.showLogDialog();
            }
          }
        });
      },
      getLogs(_0x4abb34) {
        return this.data.scriptLogs.filter(_0x3abea0 => _0x4abb34 == _0x3abea0.scriptName)[0];
      },
      makeLog(_0x163099, ..._0x449b3a) {
        if (_0x449b3a[0].includes("error")) {
          console.error("[" + _0x163099 + "] -->", ..._0x449b3a);
          _0x449b3a = "{FF6A00}" + jsLoader.getTimeStamp() + " " + _0x449b3a + "<n>";
        } else {
          console.log("[" + _0x163099 + "]", ..._0x449b3a);
          _0x449b3a = "{FFFFFF}" + jsLoader.getTimeStamp() + " " + _0x449b3a + "<n>";
        }
        let _0x1c9791 = this.getLogs(_0x163099);
        if (_0x1c9791 != null) {
          if (_0x1c9791) {
            _0x1c9791.logs += _0x449b3a;
          }
        } else {
          this.data.scriptLogs.push({
            scriptName: _0x163099,
            logs: _0x449b3a
          });
        }
      },
      showLogDialog() {
        let _0x2dab91 = "";
        this.data.scriptLogs.forEach(_0x4b32cf => {
          _0x2dab91 += _0x4b32cf.scriptName + "<n>";
        });
        try {
          function _0x4f38a3() {
            setTimeout(() => {
              jsLoader.log.showLogDialog();
            }, 100);
          }
          jsLoader.utils.createDialog(2, "Логи", "", "Выбрать", "Закрыть", _0x2dab91, function (_0x4fc57c) {
            let _0x4e5703 = jsLoader.log.getLogs(_0x4fc57c);
            setTimeout(() => {
              jsLoader.utils.createDialog(0, _0x4e5703.scriptName, "", "", "Закрыть", _0x4e5703.logs, () => {}, _0x4f38a3);
            }, 100);
            setTimeout(() => {
              let _0x2e0b32 = document.body.getElementsByClassName("window__content")[0];
              _0x2e0b32.style.overflowY = "auto";
              _0x2e0b32.style.maxHeight = "60vh";
            }, 250);
          });
        } catch (_0x433e69) {}
      }
    },
    runtime: {
      hudInfo: {
        data: {
          callBacks: []
        },
        addEventOnChangeHudInfo(_0x380401) {
          if (this.data.callBacks.length === 0) {
            const _0x3f03be = JSON.parse(JSON.stringify(window.interface("Hud").info));
            window.interface("Hud").info = new Proxy(_0x3f03be, {
              set(_0x26c71c, _0x445fdc, _0x53c338) {
                try {
                  if (jsLoader.runtime.hudInfo.data.callBacks.length === 1) {
                    jsLoader.runtime.hudInfo.data.callBacks[0](_0x445fdc, _0x53c338);
                    return Reflect.set(_0x26c71c, _0x445fdc, _0x53c338);
                  }
                  for (let _0x4bb883 of jsLoader.runtime.hudInfo.data.callBacks) {
                    _0x4bb883(_0x445fdc, _0x53c338);
                  }
                } catch (_0x9cb143) {
                  jsLoader.log.makeLog("JsLoader", "(error) [addEventOnChangeHudInfo] Error!", _0x9cb143);
                }
                return Reflect.set(_0x26c71c, _0x445fdc, _0x53c338);
              }
            });
          }
          this.data.callBacks.push(_0x380401);
          jsLoader.log.makeLog("JsLoader", "(info) [addEventOnChangeHudInfo] Add new callback");
        }
      },
      setHooks() {
        const _0x1c4365 = jsLoader.utils.phoneApps.data.appsToAddToPhone;
        jsLoader.utils.openInterfaceOptions.addListenerToOpenInterface({
          forInterface: "Phone",
          callBack: () => {
            jsLoader.log.makeLog("JsLoader", "(info) Opened interface Phone");
            if (_0x1c4365.length !== 0 && !jsLoader.utils.phoneApps.data.isHookSet) {
              jsLoader.utils.phoneApps.data.isHookSet = true;
              try {
                this.executeFunctionWhen(() => {
                  App.$.refs.Phone[0].onUnlock = new Proxy(App.$.refs.Phone[0].onUnlock, {
                    apply(_0x57f987, _0x3800fa, _0x14c275) {
                      try {
                        jsLoader.runtime.executeFunctionWhen(() => {
                          jsLoader.utils.phoneApps.showNewAppsInPhone();
                          jsLoader.log.makeLog("JsLoader", "(info) Added icons apps in phone");
                        }, () => document.querySelector(".main-screen__apps-list") !== null);
                      } catch (_0x14c27d) {
                        jsLoader.log.makeLog("JsLoader", "(error) Error while adding apps in phone " + _0x14c27d);
                      }
                      return Reflect.apply(_0x57f987, _0x3800fa, _0x14c275);
                    }
                  });
                  jsLoader.log.makeLog("JsLoader", "(info) Unlock hook set in Phone success");
                }, () => typeof App.$.refs.Phone == "object", "set phone proxy");
              } catch (_0x165b72) {
                jsLoader.log.makeLog("JsLoader", "(error) Unlock hook set in Phone failed -> " + _0x165b72);
              }
            }
          },
          notShow: false
        });
        jsLoader.utils.openInterfaceOptions.addListenerToOpenInterface({
          forInterface: "PlayerInteraction",
          callBack: _0x177c0a => {
            if (jsLoader.playerInteraction.data.itemsToAdd.length !== 0) {
              this.executeFunctionWhen(() => {
                App.$.refs.PlayerInteraction[0].setParams = new Proxy(App.$.refs.PlayerInteraction[0].setParams, {
                  apply(_0x507425, _0x2bbf0e, _0x36f50b) {
                    try {
                      _0x36f50b[0] = jsLoader.playerInteraction.getItems(_0x36f50b[0]);
                      jsLoader.log.makeLog("JsLoader", "(info) Modified playerinteraction page: " + JSON.parse(_0x36f50b[0])[1] + "...");
                    } catch (_0x31eb3b) {
                      jsLoader.log.makeLog("JsLoader", "(error) Error with modifying playerinteraction page " + _0x31eb3b + "...");
                    }
                    return Reflect.apply(_0x507425, _0x2bbf0e, _0x36f50b);
                  }
                });
              }, () => App.$.refs.PlayerInteraction !== undefined);
              if (_0x177c0a[1] !== undefined) {
                _0x177c0a[1] = jsLoader.playerInteraction.getItems(_0x177c0a[1]);
                jsLoader.log.makeLog("JsLoader", "(info) Modified playerinteraction page: " + JSON.parse(_0x177c0a[1])[1] + "...");
              }
            }
          },
          notShow: false
        });
      },
      executeFunctionWhen(_0x5bb967, _0xf12bf4, _0xa7d807 = "executeFunctionWhen", _0x383993 = 50) {
        const _0xc86576 = performance.now();
        try {
          const _0x499639 = setInterval(() => {
            if (_0xf12bf4() == 1) {
              const _0x5ca099 = performance.now() - _0xc86576;
              console.log("Executed <" + _0xa7d807 + "> in " + _0x5ca099 + "ms");
              _0x5bb967();
              clearInterval(_0x499639);
              return;
            }
          }, _0x383993);
        } catch (_0x369383) {
          jsLoader.log.makeLog("JsLoader", "(error) Error in [executeFunctionWhen] -> " + _0x369383);
        }
      },
      waitUntil: (_0x417abf, _0x48e865 = "waituntil", _0x36503c = 50) => new Promise(_0x1b4286 => {
        try {
          console.time(_0x48e865);
          const _0x447225 = setInterval(() => {
            if (_0x417abf() == 1) {
              console.timeEnd(_0x48e865);
              _0x1b4286();
              clearInterval(_0x447225);
              return;
            }
          }, _0x36503c);
        } catch (_0xf758d8) {
          jsLoader.log.makeLog("JsLoader", "(error) Error in [waitUntil] -> " + _0xf758d8);
        }
      }),
      createStyleTag(_0x58e29e, _0x459eab) {
        const _0x3c6575 = document.createElement("style");
        _0x3c6575.innerHTML = _0x58e29e;
        _0x459eab.append(_0x3c6575);
        jsLoader.log.makeLog("JsLoader", "(info) [createStyleTag] Style tag was created");
        return _0x3c6575;
      }
    },
    network: {
      data: {
        listeners: []
      },
      addListener(_0x5bf96c) {
        this.data.listeners.push(_0x5bf96c);
        jsLoader.log.makeLog("JsLoader", "(info) Added new listener in network");
      },
      _apply(_0x1fdac9, _0x980d03, _0x4f89b1) {
        try {
          for (let _0x1fcce7 of this.data.listeners) {
            if (_0x1fcce7(_0x4f89b1) == 0) {
              return false;
            }
          }
        } catch (_0x40722e) {
          jsLoader.log.makeLog("JsLoader", "(error) Error in network listener", _0x40722e);
        }
        return Reflect.apply(_0x1fdac9, _0x980d03, _0x4f89b1);
      },
      init() {
        this._apply = this._apply.bind(this);
        window.sendClientEvent = new Proxy(window.sendClientEvent, {
          apply: this._apply
        });
        jsLoader.log.makeLog("JsLoader", "(info) Network inited");
      }
    },
    playerInteraction: {
      data: {
        itemsToAdd: [],
        savedItems: {},
        initialId: 1000,
        isListenerSet: false
      },
      addNewItem(_0x3cf79b = "label", _0x233781 = "Loading", _0x5eab86 = () => {}) {
        if (!this.data.isListenerSet) {
          this.listenClicks();
        }
        this.data.itemsToAdd.push({
          label: _0x3cf79b,
          icon: _0x233781,
          callback: _0x5eab86,
          id: this.data.initialId
        });
        this.data.initialId += 1;
        jsLoader.log.makeLog("JsLoader", "(info) Added new item in PlayerInteraction: '" + _0x3cf79b + "'");
      },
      getItems(_0x579be5) {
        (_0x579be5 = JSON.parse(_0x579be5))[3] += this.data.itemsToAdd.length;
        const _0x20ee76 = +_0x579be5[1];
        let _0x5c5bda = _0x579be5[2];
        this.data.savedItems[_0x20ee76] = _0x5c5bda;
        if (_0x5c5bda.length === 8) {
          return JSON.stringify(_0x579be5);
        }
        let _0x1a3749 = [];
        for (let _0x3474db in this.data.savedItems) {
          _0x1a3749.push(...this.data.savedItems[_0x3474db]);
        }
        for (let _0x33dbfd of this.data.itemsToAdd) {
          _0x1a3749.push([_0x33dbfd.label, _0x33dbfd.icon, _0x33dbfd.id]);
        }
        const _0x3fc7d8 = (_0x20ee76 - 1) * 8;
        const _0x25d099 = _0x20ee76 * 8;
        _0x5c5bda = _0x1a3749.slice(_0x3fc7d8, _0x25d099);
        _0x579be5[2] = _0x5c5bda;
        return JSON.stringify(_0x579be5);
      },
      onItemClick(_0x57b877) {
        const _0x6d1051 = this.data.itemsToAdd.find(({
          id: _0x53f83f
        }) => _0x53f83f === _0x57b877);
        if (_0x6d1051 !== undefined) {
          _0x6d1051.callback();
          setTimeout(() => window.sendClientEvent(0, "MenuInt_OnPlayerKey"), 50);
          jsLoader.log.makeLog("JsLoader", "(info) Item: '" + _0x6d1051.label + "', id: " + _0x6d1051.id + "; In PlayerInteraction was clicked");
        }
      },
      listenClicks() {
        this.data.isListenerSet = true;
        jsLoader.network.addListener(_0x1d8755 => {
          if (_0x1d8755[1] === "MenuInt_OnPlayerClickItem" && typeof _0x1d8755[2] == "number" && _0x1d8755[2] > 999) {
            this.onItemClick(_0x1d8755[2]);
          }
        });
      }
    },
    utils: {
      phoneApps: {
        data: {
          htmlForApps: "",
          appsToAddToPhone: [],
          appContainer: null,
          openedApp: null,
          isHookSet: false
        },
        addNewApp({
          name: _0x518a44 = "app",
          iconUrl: _0x42a68c = "",
          getInnerHTML: _0x2849fa = () => {},
          onAppClose: _0x29090f,
          onAppOpen: _0x5832ad,
          id: _0x5e2fef
        }) {
          try {
            this.data.appsToAddToPhone.push({
              name: _0x518a44,
              iconUrl: _0x42a68c,
              getInnerHTML: _0x2849fa,
              onAppClose: _0x29090f,
              onAppOpen: _0x5832ad,
              id: _0x5e2fef
            });
            this.data.htmlForApps += "<div class='jsl-app-icon " + _0x518a44 + "' onclick=\"jsLoader.utils.phoneApps.openApp('" + _0x518a44 + "')\"> <img src=\"" + _0x42a68c + "\" alt=\"" + _0x518a44 + "\"></img> <span>" + _0x518a44 + "</span> </div> ";
            jsLoader.log.makeLog("JsLoader", "(info) [addPhoneApp] " + _0x518a44 + " will be added to phone apps");
          } catch (_0x185fdd) {
            jsLoader.log.makeLog("JsLoader", "(error) [addPhoneApp] Error while adding app -> " + _0x185fdd);
          }
        },
        showNewAppsInPhone() {
          try {
            document.querySelector(".main-screen__apps-list").insertAdjacentHTML("beforeend", this.data.htmlForApps);
            jsLoader.log.makeLog("JsLoader", "(info) [showNewAppsInPhone] Showing app icons in phone screen success");
          } catch (_0x28c766) {
            jsLoader.log.makeLog("JsLoader", "(error) [showNewAppsInPhone] Error while showing app icons in phone screen -> " + _0x28c766);
          }
        },
        openApp(_0xbcac5) {
          try {
            const _0x2d493c = jsLoader.utils.phoneApps;
            _0x2d493c.data.openedApp = _0x2d493c.data.appsToAddToPhone.find(_0xf54f44 => _0xf54f44.name === _0xbcac5);
            const _0x42e8ea = document.querySelector(".main-screen.phone-screen").parentElement;
            _0x2d493c.data.appContainer = document.createElement("div");
            _0x2d493c.data.appContainer.className = "jsl-app-container " + _0x2d493c.data.openedApp.id;
            _0x2d493c.data.appContainer.innerHTML = "<div class=\"jsl-app-preview\" style=\"" + _0x2d493c.data.openedApp.previewCss + "\"> <img src=\"" + _0x2d493c.data.openedApp.iconUrl + "\" alt=\"" + _0x2d493c.data.openedApp.name + "\"></img> </div> <div class=\"jsl-app-content\"> " + _0x2d493c.data.openedApp.getInnerHTML() + " </div> <div class=\"jsl-app-bottom\" onclick=\"jsLoader.utils.phoneApps.closeApp()\"> <div class=\"jsl-app-bottom-line\"></div> </div>";
            _0x42e8ea.append(_0x2d493c.data.appContainer);
            setTimeout(() => {
              _0x2d493c.data.appContainer.style.opacity = 1;
            }, 10);
            Promise.all(document.querySelector(".jsl-app-preview").getAnimations().map(_0xfe934d => _0xfe934d.finished)).then(() => {
              document.querySelector(".jsl-app-preview").remove();
            });
            _0x2d493c.data.openedApp.onAppOpen();
            jsLoader.log.makeLog("JsLoader", "(info) [openPhoneApp] Opening " + _0xbcac5 + " in phone success");
          } catch (_0x19410e) {
            jsLoader.log.makeLog("JsLoader", "(error) [openPhoneApp] Error while opening " + _0xbcac5 + " in phone -> " + _0x19410e);
          }
        },
        closeApp() {
          try {
            const _0x164ccf = jsLoader.utils.phoneApps;
            _0x164ccf.data.appContainer.style.transform = "translate3d(0, -100%, 0)";
            setTimeout(() => {
              _0x164ccf.data.appContainer.remove();
            }, 300);
            _0x164ccf.data.openedApp.onAppClose();
            jsLoader.log.makeLog("JsLoader", "(info) [closeApp] Close " + _0x164ccf.data.openedApp.name + " app success");
          } catch (_0x5cb3e5) {
            jsLoader.log.makeLog("JsLoader", "(error) [closeApp] Error while closing app -> " + _0x5cb3e5);
          }
        }
      },
      data: {
        originalSendClientEvent: null,
        originalAddDialogInQueue: null
      },
      openInterfaceOptions: {
        _multipleListeners: [],
        addListenerToOpenInterface({
          forInterface: _0x3c0f9e = "",
          callBack: _0x5de948,
          notShow: _0x776126
        }) {
          this._multipleListeners.push({
            forInterface: _0x3c0f9e,
            callBack: _0x5de948,
            notShow: _0x776126
          });
          jsLoader.log.makeLog("JsLoader", "[addListenerToOpenInterface] Function added for " + _0x3c0f9e + " interface");
        },
        _listeners: [],
        setListenerToOpenInterface(_0x2d1a45, _0x5af637) {
          this._listeners[_0x2d1a45] = _0x5af637;
          jsLoader.log.makeLog("JsLoader", "[setListenerToOpenInterface] Function added for " + _0x2d1a45 + " interface");
        },
        _closeInterfaceListeners: [],
        setListenerToCloseInterface(_0x4de498, _0x513ad5) {
          this._closeInterfaceListeners[_0x4de498] = _0x513ad5;
          jsLoader.log.makeLog("JsLoader", "[setListenerToCloseInterface] Function added for " + _0x4de498 + " interface");
        },
        removeListenerFromCloseInterface(_0x10356a) {
          if (this._closeInterfaceListeners[_0x10356a] !== undefined) {
            delete this._closeInterfaceListeners[_0x10356a];
            jsLoader.log.makeLog("JsLoader", "[removeListenerFromCloseInterface] Function removed for " + _0x10356a + " interface");
          }
        },
        removeListenerToOpenInterface(_0x3e42fd) {
          this._multipleListeners = this._multipleListeners.filter(_0x472dbf => _0x472dbf.forInterface !== _0x3e42fd);
        },
        init() {
          window.openInterface = new Proxy(window.openInterface, {
            apply(_0x5977ff, _0x433652, _0x553f5f) {
              const _0x576bd8 = _0x553f5f[0];
              const _0x5c0b93 = jsLoader.utils.openInterfaceOptions._multipleListeners.filter(_0x4cf355 => _0x4cf355.forInterface === _0x553f5f[0]);
              if (jsLoader.utils.openInterfaceOptions._listeners[_0x576bd8] !== undefined && jsLoader.utils.openInterfaceOptions._listeners[_0x576bd8](_0x553f5f) == 0) {
                return false;
              }
              for (let _0x1e894b = 0; _0x1e894b < _0x5c0b93.length; _0x1e894b += 1) {
                _0x5c0b93[_0x1e894b].callBack(_0x553f5f);
                if (_0x5c0b93[_0x1e894b].notShow === true) {
                  return false;
                }
              }
              return Reflect.apply(_0x5977ff, _0x433652, _0x553f5f);
            }
          });
          window.closeInterface = new Proxy(window.closeInterface, {
            apply(_0x454ab3, _0x3fb421, _0x198613) {
              const _0x2c22c0 = _0x198613[0];
              return (jsLoader.utils.openInterfaceOptions._closeInterfaceListeners[_0x2c22c0] === undefined || jsLoader.utils.openInterfaceOptions._closeInterfaceListeners[_0x2c22c0](_0x198613) != 0) && Reflect.apply(_0x454ab3, _0x3fb421, _0x198613);
            }
          });
        }
      },
      closeDialog() {
        if (IsDialogOpened()) {
          App.$.refs[Object.keys(App.$.refs).at(-1)][0].back();
          window.isFakeDialog = false;
        }
      },
      createDialog(_0x5f2bc6 = 0, _0x4d1216 = "Test", _0xd9bf63 = "test2", _0x44579a = "Выбрать", _0x2d4f05 = "Закрыть", _0x46be28 = "Test", _0x48f2b5 = () => {}, _0x1f0ea8 = () => {}) {
        if (this.data.originalSendClientEvent == null) {
          this.data.originalSendClientEvent = window.sendClientEvent;
          this.data.originalAddDialogInQueue = window.addDialogInQueue;
          window.sendClientEvent = new Proxy(window.sendClientEvent, {
            apply(_0x20ab42, _0x51531b, _0x211002) {
              try {
                if (_0x211002.includes("OnDialogResponse") && window.isFakeDialog) {
                  window.sendClientEvent = jsLoader.utils.data.originalSendClientEvent;
                  jsLoader.utils.data.originalSendClientEvent = null;
                  window.addDialogInQueue = jsLoader.utils.data.originalAddDialogInQueue;
                  jsLoader.utils.data.originalAddDialogInQueue = null;
                  if (_0x211002[3] == 0) {
                    _0x1f0ea8();
                    jsLoader.log.makeLog("JsLoader", "(info) Executed function on left btn -> '" + _0x4d1216 + "'...");
                  }
                  if (_0x211002[3] == 1) {
                    _0x48f2b5(_0x211002[5].replace("<div style=\"display: none\">jslDialog</div>", ""));
                    jsLoader.log.makeLog("JsLoader", "(info) Executed function on right btn -> '" + _0x4d1216 + "'...");
                  }
                  jsLoader.log.makeLog("JsLoader", "(info) Close fake dialog -> '" + _0x4d1216 + "'...");
                  return false;
                }
              } catch (_0x501500) {
                jsLoader.log.makeLog("JsLoader", "(error) Error in fake dialog " + _0x501500 + "...");
              }
              return Reflect.apply(_0x20ab42, _0x51531b, _0x211002);
            }
          });
          window.addDialogInQueue = new Proxy(window.addDialogInQueue, {
            apply: (_0x56304d, _0xcad3bd, _0x246183) => _0x246183.length > 1 && _0x246183[1].includes("jslDialog") ? (_0x246183[1] = _0x246183[1].replace("jslDialog", ""), window.isFakeDialog = true, Reflect.apply(_0x56304d, _0xcad3bd, _0x246183)) : (window.isFakeDialog = false, window.sendClientEvent = jsLoader.utils.data.originalSendClientEvent, jsLoader.utils.data.originalSendClientEvent = null, window.addDialogInQueue = jsLoader.utils.data.originalAddDialogInQueue, jsLoader.utils.data.originalAddDialogInQueue = null, Reflect.apply(_0x56304d, _0xcad3bd, _0x246183))
          });
          jsLoader.log.makeLog("JsLoader", "(info) Set hooks for fake dialog -> '" + _0x4d1216 + "'...");
        }
        window.addDialogInQueue("[0," + _0x5f2bc6 + ",\"" + _0x4d1216 + "\",\"" + _0xd9bf63 + "\",\"" + _0x44579a + "\",\"" + _0x2d4f05 + "\",0,0]", "jslDialog" + _0x46be28, 0);
        jsLoader.log.makeLog("JsLoader", "(info) Fake dialog: '" + _0x4d1216 + "' was created...");
      },
      createGameText(_0x3d970b = -1, _0x8af6a = "test", _0x9e1ae6 = 1000) {
        window.interface("GameText").add("[" + _0x3d970b + ",\"" + _0x8af6a + "\"," + _0x9e1ae6 + ",0,-1,1]");
      }
    },
    x0_2034dsa: {
      data: {
        jslContainer: null,
        isNewHudAdded: false,
        isNewSpeedometerAdded: false
      },
      x1_3ksl3dk(_0x246cea, _0x5b678e, _0x2fb609) {
        if (this.data.isNewHudAdded) {
          return;
        }
        const _0x5b0c57 = document.createElement("div");
        try {
          jsLoader.runtime.hudInfo.addEventOnChangeHudInfo(_0x2fb609);
          window.interface("Hud").showGreenZoneTab = () => _0x2fb609("showGreenZoneTab");
          window.interface("Hud").hideGreenZoneTab = () => _0x2fb609("hideGreenZoneTab");
          window.interface("Hud").setBonus = _0x30b20d => {
            _0x2fb609("setBonus", _0x30b20d);
            window.interface("Hud").bonus = _0x30b20d;
          };
          window.interface("Hud").setServer = _0x46f27c => {
            _0x2fb609("setServer", _0x46f27c);
            window.interface("Hud").server = _0x46f27c;
          };
          window.interface("Hud").setHelloween = _0x22dc64 => {
            _0x2fb609("setHelloween", _0x22dc64);
            window.interface("Hud").isHelloween = _0x22dc64;
          };
          window.interface("Hud").setNewYear = _0x1cea0c => {
            _0x2fb609("setNewYear", _0x1cea0c);
            window.interface("Hud").isNewYear = _0x1cea0c;
          };
          window.interface("Hud").setHelloween = _0x1553ef => {
            _0x2fb609("setHelloween", _0x1553ef);
            window.interface("Hud").isHelloween = _0x1553ef;
          };
          jsLoader.runtime.createStyleTag("body #app .hud-radmir-info {display: none}", document.head);
          _0x5b0c57.classList = _0x5b678e;
          _0x5b0c57.innerHTML = _0x246cea;
          this.data.jslContainer.append(_0x5b0c57);
          this.data.isNewHudAdded = true;
          jsLoader.log.makeLog("JsLoader", "(info) [addNewHud] Added new hud");
        } catch (_0x404b74) {
          jsLoader.log.makeLog("JsLoader", "(error) [addNewHud] Error while adding new hud", _0x404b74);
        }
        return _0x5b0c57;
      },
      _0xDBdj2J(_0x4a8ac8, _0x34d9cb, _0x8e142f) {
        if (this.data.isNewSpeedometerAdded) {
          return;
        }
        jsLoader.runtime.createStyleTag("body #app .hud-radmir-speedometer {display: none}", document.head);
        const _0x3ddd5a = document.createElement("div");
        try {
          const _0xe7b724 = JSON.parse(JSON.stringify(window.interface("Hud").speedometer));
          window.interface("Hud").speedometer = new Proxy(_0xe7b724, {
            set: (_0x4af730, _0x1d60cd, _0x176c2b) => {
              _0x8e142f(_0x1d60cd, _0x176c2b);
              return Reflect.set(_0x4af730, _0x1d60cd, _0x176c2b);
            }
          });
          window.interface("Hud").showTachometer = new Proxy(window.interface("Hud").showTachometer, {
            apply: (_0x541bbe, _0x4838f7, _0x3c8d1f) => {
              _0x8e142f("tachometer-show", 1);
              return Reflect.apply(_0x541bbe, _0x4838f7, _0x3c8d1f);
            }
          });
          window.interface("Hud").hideTachometer = new Proxy(window.interface("Hud").hideTachometer, {
            apply: (_0x44cbcc, _0xdba8c9, _0x5d6824) => {
              _0x8e142f("tachometer-show", 0);
              return Reflect.apply(_0x44cbcc, _0xdba8c9, _0x5d6824);
            }
          });
          window.interface("Hud").setTurnLightStatus = (_0x5b1908, _0x2fb970) => {
            _0x8e142f(_0x5b1908 ? "right" : "left", _0x2fb970);
          };
          const _0x156d60 = JSON.parse(JSON.stringify(window.interface("Hud").speedometer.params));
          window.interface("Hud").speedometer.params = new Proxy(_0x156d60, {
            set: (_0x56b1d8, _0x48e883, _0x332be1) => {
              _0x8e142f(_0x48e883, _0x332be1);
              return Reflect.set(_0x56b1d8, _0x48e883, _0x332be1);
            }
          });
          _0x3ddd5a.classList = _0x34d9cb;
          _0x3ddd5a.innerHTML = _0x4a8ac8;
          this.data.jslContainer.append(_0x3ddd5a);
          this.data.isNewSpeedometerAdded = true;
          jsLoader.log.makeLog("JsLoader", "(info) [addNewSpeedometer] Added new speedometer");
        } catch (_0x13c5ff) {
          jsLoader.log.makeLog("JsLoader", "(error) [addNewSpeedometer] error while adding new speedometer", _0x13c5ff);
        }
        return _0x3ddd5a;
      },
      init() {
        this.data.jslContainer = document.createElement("div");
        this.data.jslContainer.classList.add("JSL-Container");
        document.body.append(this.data.jslContainer);
        jsLoader.log.makeLog("JsLoader", "(info) [hud init] Created jslContainer");
      }
    },
    chat: {
      _chatListeners: [],
      addChatListener(_0x5f2bc7) {
        if (this._chatListeners.length === 0) {
          window.interface("Hud").$refs.chat.add = new Proxy(window.interface("Hud").$refs.chat.add, {
            apply(_0x50740b, _0x2b4698, _0x43f658) {
              for (let _0x72aadc of jsLoader.chat._chatListeners) {
                if (_0x72aadc(..._0x43f658) === false) {
                  return false;
                }
              }
              return Reflect.apply(_0x50740b, _0x2b4698, _0x43f658);
            }
          });
          jsLoader.log.makeLog("JsLoader", "(info) [addChatListener] Set proxy to chat");
        }
        this._chatListeners.push(_0x5f2bc7);
        jsLoader.log.makeLog("JsLoader", "(info) [addChatListener] Added new listener");
      },
      _registeredCommands: {},
      registerCommand(_0x113f39, _0x172a7a) {
        if (Object.keys(this._registeredCommands).length === 0) {
          window.sendChatInput = new Proxy(window.sendChatInput, {
            apply(_0x579c01, _0x33f019, _0x4f7c22) {
              const [_0x52f73c, ..._0x3f5679] = _0x4f7c22.join("").trim().split(/\s+/);
              return (jsLoader.chat._registeredCommands[_0x52f73c] === undefined || jsLoader.chat._registeredCommands[_0x52f73c](_0x3f5679) != 0) && Reflect.apply(_0x579c01, _0x33f019, _0x4f7c22);
            }
          });
          window.interface("Hud").$refs.chat.$refs.hints._.ctx = new Proxy(window.interface("Hud").$refs.chat.$refs.hints._.ctx, {
            get(_0x5e1087, _0xa7b9f1) {
              const {
                inputText: _0x16184d
              } = window.interface("Hud").$refs.chat;
              const _0x1fbb6b = Object.keys(jsLoader.chat._registeredCommands);
              if (_0xa7b9f1 === "hints" && _0x16184d.length > 1) {
                const _0x1d04c2 = _0x1fbb6b.filter(_0xcaeca => _0xcaeca.indexOf(_0x16184d) === 0);
                if (_0x1d04c2.length) {
                  for (let _0x3e7da2 of _0x1d04c2) {
                    if (!_0x5e1087[_0xa7b9f1].includes(_0x3e7da2) && _0x5e1087[_0xa7b9f1].length < 5) {
                      _0x5e1087[_0xa7b9f1].push(_0x3e7da2);
                    }
                  }
                }
              }
              return Reflect.get(_0x5e1087, _0xa7b9f1);
            }
          });
          jsLoader.log.makeLog("JsLoader", "(info) [registerCommand] Set proxy to sendChatInput");
        }
        this._registeredCommands[_0x113f39] = _0x172a7a;
        jsLoader.log.makeLog("JsLoader", "(info) [registerCommand] Registered new command: " + _0x113f39);
      },
      send(_0x1d87ae) {
        window.sendChatInput(_0x1d87ae);
      },
      addChatMessage(_0x3aa716, _0x513664) {
        window.interface("Hud").$refs.chat.add(_0x3aa716, _0x513664);
      },
      _controlButtonEl: null,
      _createControlButton() {
        this._controlButtonEl = document.createElement("div");
        this._controlButtonEl.className = "controls-button__container JSL-control-button";
        this._controlButtonEl.innerHTML = "<div class=\"controls-button clickable controls-button_rounded\"> <div class=\"controls-button--text\">J</div> </div> <div class=\"controls-button__container-text\">JsLoader</div>";
        document.addEventListener("keydown", _0x29ce69 => {
          if (_0x29ce69.keyCode === 74) {
            this._controlButtonEl.classList.add("JSL-control-button-hover");
          }
        });
        document.addEventListener("keyup", _0x3ddf42 => {
          if (_0x3ddf42.keyCode === 74) {
            this._controlButtonEl.classList.remove("JSL-control-button-hover");
          }
        });
      },
      _appendControlButton() {
        if (this._controlButtonEl === null) {
          this._createControlButton();
        }
        jsLoader.runtime.executeFunctionWhen(() => {
          if (App.$children[0].$children[2].useChat != 0) {
            App.$children[0].$children[2].isHudControls;
          }
        }, () => document.querySelector(".hud-radmir-controls") !== null, "control button append", 10);
      }
    },
    mainMenu: {
      _types: ["Range", "Switch", "Help", "Select", "Bind"],
      options: [],
      addNewOption(_0x59a07d, _0xa80178, _0x441c85) {
        const _0x2d0978 = document.createElement("div");
        if (this._types[_0x59a07d] === "Switch") {
          this.options.push(() => {
            _0x2d0978.className = "main-menu-account__row-container JSL-option-switch " + (_0x441c85.initialVar() ? "JSL-option-switch--active" : "");
            _0x2d0978.innerHTML = "<div class=\"main-menu-account__row\"> <div class=\"main-menu-account__row-label\">" + _0xa80178 + "</div> <div class=\"input-switch main-menu-account__row__switch\"> <div class=\"input-switch__fill\"> <svg width=\"9\" height=\"7\" style=\"width: 0.83vh; height: 0.65vh;\" viewBox=\"0 0 9 7\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M2.88 4.66667L0 3L2.88 7L9 0L2.88 4.66667Z\" fill=\"#F4F1E1\"></path> </svg> </div> </div> </div>";
            _0x2d0978.onclick = () => {
              _0x441c85.callback();
              _0x2d0978.classList.toggle("JSL-option-switch--active", _0x441c85.initialVar());
            };
            return _0x2d0978;
          });
        }
        if (this._types[_0x59a07d] === "Bind") {
          const _0x3c4330 = new JslBindUI(_0x441c85.keyCode, _0x441c85.defaultKeyCode, _0x441c85.callback);
          this.options.push(() => {
            _0x2d0978.className = "main-menu-account__row-container JSL-option-switch";
            _0x2d0978.innerHTML = "<div class=\"main-menu-account__row\"> <div class=\"main-menu-account__row-label\">" + _0xa80178 + "</div> </div>";
            _0x2d0978.querySelector(".main-menu-account__row").appendChild(_0x3c4330.getEl);
            return _0x2d0978;
          });
        }
        if (this._types[_0x59a07d] === "Range") {
          this.options.push(() => {
            _0x2d0978.className = "main-menu-account__row-container JSL-option-range";
            _0x2d0978.innerHTML = "<div class=\"main-menu-account__row main-menu-account__row_range\"> <div class=\"mobile-range\"> <div class=\"mobile-range__content\"> <div class=\"range-title\">" + _0xa80178 + "</div> <div class=\"range-value\">" + _0x441c85.value() + "<div class=\"range-value__percent\">" + _0x441c85.rangeText + "</div></div> </div> </div> <x-range min=\"" + _0x441c85.min + "\" max=\"" + _0x441c85.max + "\" step=\"" + _0x441c85.step + "\" value=\"" + _0x441c85.value() + "\"></x-range> </div>";
            const _0x2a3465 = _0x2d0978.querySelector(".range-value");
            _0x2d0978.querySelector("x-range").oninput = _0x42da4a => {
              _0x2a3465.innerHTML = _0x42da4a.target.value + "<div class=\"range-value__percent\">" + _0x441c85.rangeText + "</div>";
              _0x441c85.callback(_0x42da4a.target.value);
            };
            return _0x2d0978;
          });
        }
        if (this._types[_0x59a07d] === "Select") {
          const _0x476e24 = new JslSelectUI(_0x441c85.data, _0x441c85.selectedId, _0x441c85.callback);
          this.options.push(() => {
            _0x2d0978.className = "main-menu-account__row-container JSL-option-select";
            _0x2d0978.innerHTML = "<div class=\"main-menu-account__row\"> <div class=\"main-menu-account__row-label\">" + _0xa80178 + "</div> </div>";
            _0x2d0978.querySelector(".main-menu-account__row").appendChild(_0x476e24.getEl);
            return _0x2d0978;
          });
        }
        if (this._types[_0x59a07d] === "Help") {
          this.options.push(() => {
            _0x2d0978.className = "main-menu-account__row-container JSL-option-select";
            _0x2d0978.innerHTML = "<div class=\"main-menu-account__row\"> <div class=\"main-menu-account__row-label\">" + _0xa80178 + "</div> <svg style=\"width: 2.5vh;height: 2.5vh;\" width=\"13\" height=\"18\" viewBox=\"0 0 13 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M0 6.942L2.57488 0.957031L11.0503 1.844L12.25 5.5607L6.5879 8.80612L3.99456 13.6943L3.61175 11.4486L3.99456 8.14724L7.98912 4.41898L3.99456 3.88638L0 6.942Z\" fill=\"#F4F1E1\"></path> <path d=\"M3.72826 18.0005C4.61065 18.0005 5.32608 17.2851 5.32608 16.4027C5.32608 15.5202 4.61065 14.8048 3.72826 14.8048C2.84586 14.8048 2.13043 15.5202 2.13043 16.4027C2.13043 17.2851 2.84586 18.0005 3.72826 18.0005Z\" fill=\"#F4F1E1\"></path> </svg> </div>";
            _0x2d0978.onclick = _0x441c85.callback;
            return _0x2d0978;
          });
        }
      },
      _isGettingLvl: false,
      _callback: null,
      getLvlAndExp(_0x458855) {
        this._isGettingLvl = true;
        this._callback = _0x458855;
        jsLoader.chat.send("/mn");
      },
      _appendNewSettings() {
        const _0x11ad81 = document.getElementsByClassName("main-menu-account__col");
        let _0x3ca28e;
        for (let _0x4adc72 of this.options) {
          _0x3ca28e = +!(_0x11ad81[0].children.length <= _0x11ad81[1].children.length);
          _0x11ad81[_0x3ca28e].append(_0x4adc72());
        }
      },
      _waitOpenInterface() {
        jsLoader.utils.openInterfaceOptions.setListenerToOpenInterface("MainMenu", _0x48dea9 => {
          if (jsLoader.mainMenu._isGettingLvl) {
            jsLoader.mainMenu._callback(JSON.parse(_0x48dea9[1])[2][4]);
            jsLoader.mainMenu._isGettingLvl = false;
            jsLoader.mainMenu._callback = null;
            setTimeout(() => {
              sendClientEventHandle(0, "MainMenu_OnPlayerCloseInterface");
            }, 50);
            return false;
          }
          jsLoader.runtime.executeFunctionWhen(() => {
            App.$.refs.MainMenu[0].selectTab = new Proxy(App.$.refs.MainMenu[0].selectTab, {
              apply: (_0x3f3424, _0x4ddf8f, _0x2a4202) => {
                if (_0x2a4202[0] === "Account" && window.interface("MainMenu").currentTabName !== "Account") {
                  jsLoader.runtime.executeFunctionWhen(() => {
                    jsLoader.mainMenu._appendNewSettings();
                  }, () => document.querySelector(".main-menu-account__col") !== null, "append new settings", 5);
                  jsLoader.log.makeLog("JsLoader", "(info) [waitOpenInterface] Settings open");
                }
                return Reflect.apply(_0x3f3424, _0x4ddf8f, _0x2a4202);
              }
            });
          }, () => App.$.refs.MainMenu !== undefined, "wait main menu init", 10);
          jsLoader.log.makeLog("JsLoader", "(info) [waitOpenInterface] Main menu opened");
        });
        jsLoader.utils.openInterfaceOptions.setListenerToCloseInterface("MainMenu", () => {
          window.onMainMenuClose();
        });
        window.onMainMenuClose = () => {};
      },
      getSkinPath() {}
    },
    game: {
    //   readMemorySync: async (_0x4f2150, _0x3dc60b) => new Promise(_0x200b4f => {
    //     jsLoader.socket.sendEvent("readMemory|" + _0x3dc60b + "|" + Number(_0x4f2150), _0x4cef33 => {
    //       _0x200b4f(_0x4cef33);
    //     });
    //   }),
    //   readMemory(_0x37c880, _0x4a8923, _0x55066d) {
    //     jsLoader.socket.sendEvent("readMemory|" + _0x4a8923 + "|" + Number(_0x37c880), _0x55066d);
    //   }
    },
    data: {
      version: "",
      wrapperElem: null,
      icons: {
        info: {
          url: "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <rect x=\"57\" y=\"53\" width=\"5\" height=\"37\" rx=\"2.5\" fill=\"white\"/> <rect x=\"56\" y=\"34\" width=\"7\" height=\"7\" rx=\"3.5\" fill=\"white\"/> <circle cx=\"60\" cy=\"60\" r=\"47.5\" stroke=\"white\" stroke-width=\"5\"/> </svg>"
        },
        warning: {
          url: "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M60 107.5C66.2378 107.5 72.4145 106.271 78.1774 103.884C83.9404 101.497 89.1768 97.9984 93.5876 93.5876C97.9983 89.1768 101.497 83.9404 103.884 78.1775C106.271 72.4145 107.5 66.2378 107.5 60C107.5 53.7622 106.271 47.5855 103.884 41.8225C101.497 36.0596 97.9984 30.8232 93.5876 26.4124C89.1768 22.0017 83.9404 18.5028 78.1775 16.1157C72.4145 13.7286 66.2378 12.5 60 12.5C53.7622 12.5 47.5855 13.7286 41.8225 16.1157C36.0596 18.5028 30.8232 22.0016 26.4124 26.4124C22.0016 30.8232 18.5028 36.0596 16.1157 41.8225C13.7286 47.5855 12.5 53.7622 12.5 60C12.5 66.2378 13.7286 72.4145 16.1157 78.1775C18.5028 83.9404 22.0016 89.1768 26.4124 93.5876C30.8232 97.9984 36.0596 101.497 41.8225 103.884C47.5855 106.271 53.7622 107.5 60 107.5L60 107.5Z\" stroke=\"white\" stroke-width=\"5\" stroke-linecap=\"round\"/> <path d=\"M45 45L75 75\" stroke=\"white\" stroke-width=\"5\" stroke-linecap=\"round\"/> <path d=\"M75 45L45 75\" stroke=\"white\" stroke-width=\"5\" stroke-linecap=\"round\"/> </svg> "
        },
        success: {
          url: "<svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <circle cx=\"60\" cy=\"60\" r=\"47.5\" stroke=\"white\" stroke-width=\"5\"/> <path d=\"M40 60L55 75L80 45\" stroke=\"white\" stroke-width=\"5\" stroke-linecap=\"round\"/> </svg>"
        }
      }
    },
    setStyles() {
      this.runtime.createStyleTag(".JSL-Container{height:100vh;width:100vw;position:absolute;top:0;left:0;z-index:-1}.main-menu-account{max-height:84vh;overflow:auto}.jsl-bind{font:500 2vh Rebrand;color:hsl(51deg 46% 92% / 70%);box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:2vh}.jsl-bind-active .jsl-bind__char,.jsl-bind-active .jsl-bind__reset{z-index:13}.jsl-bind-active .jsl-bind__backdrop{display:block}.jsl-bind__backdrop{background:0 0;position:fixed;top:0;left:0;right:0;bottom:0;z-index:12;display:none}.jsl-bind__char{padding:.6vh;border:.09vh solid hsl(51deg 46% 92% / 40%);width:2.7vh;height:2.7vh;display:flex;align-items:center;justify-content:center}.jsl-bind__reset{width:2vh;height:2vh}.jsl-bind__reset path{fill:hsl(51deg 46% 92% / 70%)}.jsl-bind__reset:hover path{fill:#fff}x-range{--thumb-size:0.741vh;--thumb-color:#ddd;--thumb-shadow:#000;--thumb-hover-color:#fff;--track-size:0.370vh;--track-color:#888;--track-shadow:#000;--elapsed-color:#ddd;--remaining-color:transparent;--radius:calc(var(--track-size)/2);display:inline-block;position:relative;width:12.963vh;height:1.481vh}x-range .-elapsed,x-range .-remaining,x-range .-track{position:absolute}x-range .-track{width:100%;left:0}x-range .-elapsed{left:0}x-range .-remaining{right:0}x-range .-inner{position:absolute;left:var(--thumb-size);right:var(--thumb-size)}x-range .-thumb{all:unset;position:absolute;transform:translate(-50%,-50%)}x-range[disabled]{opacity:.5}x-range:not([disabled]) .-thumb:hover{background-color:var(--thumb-hover-color)}.JSL-option-switch .main-menu-account__row__switch{width:3.15vh;height:1.76vh;border-radius:1.48vh;background:hsl(51deg 46% 92% / 10%);display:flex;align-items:center;justify-content:flex-start;padding:0 .19vh;box-sizing:border-box;cursor:pointer;transition:.25s}.JSL-option-switch .input-switch__fill{background:hsl(51deg 46% 92%);width:1.39vh;height:1.39vh;border-radius:50%;display:flex;justify-content:center;align-items:center;transition:.25s}.JSL-option-switch--active .main-menu-account__row__switch{background:hsl(51deg 46% 92%)}.JSL-option-switch--active .input-switch__fill{background:hsl(0deg 0% 8%);margin-left:calc(100% - 1.39vh)}.JSL-option-range x-range{width:100%;z-index:1}.JSL-option-range .main-menu-account__row{display:flex;flex-direction:column}.JSL-option-range x-range .-track{background:hsl(51deg 46% 92% / 25%);height:.09vh}.JSL-option-range x-range .-thumb{width:2.22vh;height:2.22vh;background:hsl(0deg 0% 100%);border-radius:50%}.JSL-option-range x-range .-elapsed{height:.56vh;background:hsl(0deg 0% 100%);transform:translateY(-50%)}.jsl-select{position:relative;font-weight:700;font-size:1.38vh;font-family:Rebrand;border:.09vh solid hsl(51deg 46% 92% / 40%);width:21.48vh;height:4.53vh;color:hsl(51deg 46% 92% / 60%);text-transform:uppercase;z-index:11}.jsl-select__data{width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:.74vh}.jsl-select__value{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:21vh}.jsl-select *{margin:0;padding:0;box-sizing:border-box}.jsl-select-open{z-index:12}.jsl-select-open .jsl-select__dropdown{display:unset}.jsl-select-open .jsl-select__arrow{transform:rotate(-180deg)}.jsl-select-open .jsl-select__backdrop{display:unset}.jsl-select__dropdown{background:#000;position:absolute;top:4.53vh;left:-.09vh;right:0;list-style:none;display:none;max-height:18vh;overflow:auto;border:.09vh solid hsl(51deg 46% 92% / 25%)}.jsl-select__dropdown-item{border-bottom:.09vh solid hsl(51deg 46% 92% / 25%);padding:1vh 1vh;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.jsl-select__dropdown-item:last-child{border-bottom:unset}.jsl-select__dropdown-item--selected{color:#fff}.jsl-select__dropdown-item:hover{color:hsl(51deg 46% 92%)}.jsl-select__arrow{width:.93vh;height:.56vh;margin-top:.6vh;transition:.25s}.jsl-select__backdrop{position:fixed;top:0;left:0;right:0;bottom:0;display:none}.jsl-select__dropdown::-webkit-scrollbar{width:.28vh}.jsl-select__dropdown::-webkit-scrollbar-thumb{background-color:hsl(51deg 32% 84%);width:.19vh}.JSL-control-button{display:flex;align-items:center;justify-content:center;margin-left:.8vh}.JSL-control-button .controls-button_rounded{border-radius:50%;padding:0;width:2.22vh;height:2.22vh;background:hsl(51deg 46% 92%);display:inline-flex;justify-content:center;align-items:baseline;transition-duration:.25s}.JSL-control-button .controls-button_rounded:hover,.JSL-control-button-hover .controls-button_rounded{background:hsl(0deg 0% 8%);color:hsl(51deg 46% 92%)}.JSL-control-button .controls-button__container-text{margin-left:.74vh}#JSL-toastWrapper{animation:fade-in .25s ease forwards;z-index:1;user-select:none;position:absolute;bottom:0;right:0;display:flex;align-items:flex-end;flex-direction:column-reverse;width:100vw;height:100vh;padding:4vh;background:linear-gradient(323deg, hsl(0deg 0% 12%) 0.19%, hsl(0deg 0% 15% / 0%) 57.93%);}.JSL-toast{animation:fade-in .25s ease,slide-in .3s ease,fade-out .25s ease 2.5s;padding:1.3vh;display:flex;margin-top:3vh;background:hsl(0deg 0% 100% / 30%);box-sizing:border-box;border-radius:1vh;align-items:center;gap:1.3vh;min-width:21vh}.JSL-toast__icon svg{width:100%;height:100%}.JSL-toast__icon{display:flex;width:3.7vh;height:3.7vh}.JSL-toast__content{display:flex;flex-direction:column;align-items:flex-start}.JSL-content__scriptName{font-family:GothamPro;font-style:normal;font-weight:600;font-size:1.6008537886873vh;line-height:2.134471718249733vh;color:hsl(0deg 0% 100%)}.JSL-content__status{font-family:GothamPro;font-style:normal;font-weight:400;font-size:1.3vh;color:hsl(0deg 0% 100% / 70%)}.closes{animation:fade-out .3s ease .2s!important}@keyframes fade-in{from{opacity:0}}@keyframes fade-out{to{opacity:0}}@keyframes slide-in{from{transform:translateY(1vh)}}.jsl-app-icon{width:100%;display:flex;align-items:center;cursor:pointer;flex-direction:column;justify-content:center;gap:.463vh}.jsl-app-icon>img{width:3.333vh;height:3.333vh}.jsl-app-icon>span{color:#fff;font-size:.88vh}.jsl-app-container{width:100%;height:calc(100% - 3.2vh);position:absolute;top:0;transition:.2s cubic-bezier(.46,.03,.52,.96);opacity:0}.jsl-app-preview{animation:fade-out .2s cubic-bezier(.4,0,.2,1) .9s forwards;position:absolute;z-index:10;width:100%;height:100%;top:0;left:0;background:hsl(0deg 0% 100%);display:flex;align-items:center;justify-content:center}.jsl-app-preview>img{width:8vh;height:8vh}.jsl-app-content{background-color:#8a2be2;height:100%}.jsl-app-bottom{z-index:11;position:absolute;bottom:0;width:100%;height:2vh;bottom:.5vh;cursor:pointer;display:flex;align-items:center}.jsl-app-bottom-line{width:5.9vh;height:.38vh;background:hsl(0deg 0% 0%);border-radius:1vh;margin:0 auto}", document.head);
      jsLoader.log.makeLog("JsLoader", "(info) Set styles...");
    },
    createWrapper() {
      try {
        this.data.wrapperElem = document.createElement("div");
        this.data.wrapperElem.id = "JSL-toastWrapper";
        document.body.append(this.data.wrapperElem);
        jsLoader.log.makeLog("JsLoader", "(info) Created toast wrapper...");
      } catch (_0x1185a1) {
        jsLoader.log.makeLog("JsLoader", "(error) Error with create toast wrapper " + _0x1185a1 + "...");
      }
    },
    deleteWrapper() {
      try {
        if (jsLoader.data.wrapperElem.children.length == 0) {
          jsLoader.data.wrapperElem.classList.add("closes");
          Promise.all(jsLoader.data.wrapperElem.getAnimations().map(_0x3b6b24 => _0x3b6b24.finished)).then(() => {
            jsLoader.data.wrapperElem.remove();
            jsLoader.data.wrapperElem = null;
            jsLoader.log.makeLog("JsLoader", "(info) Deleted toast wrapper...");
          });
        }
      } catch (_0x115db2) {
        jsLoader.log.makeLog("JsLoader", "(error) Error with delete toast wrapper " + _0x115db2 + "...");
      }
    },
    showConnectedScript(_0x78142f = "info", _0x437f28 = "scriptName", _0x447376 = "Загружен", _0x4c1cbf = "") {
      try {
        if (this.data.wrapperElem == null) {
          this.createWrapper();
        }
        const _0xedc08d = document.createElement("div");
        _0xedc08d.style.cssText = _0x4c1cbf;
        _0xedc08d.className = "JSL-toast";
        _0xedc08d.innerHTML = "<div class=\"JSL-toast__icon\"> " + this.data.icons[_0x78142f].url + " </div> <div class=\"JSL-toast__content\"> <div class=\"JSL-content__scriptName\">" + _0x437f28 + "</div> <div class=\"JSL-content__status\">" + _0x447376 + "</div> </div>";
        this.data.wrapperElem.append(_0xedc08d);
        Promise.all(_0xedc08d.getAnimations().map(_0x148bac => _0x148bac.finished)).then(() => {
          _0xedc08d.remove();
          this.deleteWrapper();
        });
        jsLoader.log.makeLog("JsLoader", "(info) Showing script toast: " + _0x437f28 + "...");
      } catch (_0x3b273c) {
        jsLoader.log.makeLog("JsLoader", "(error) Error with show toast script: " + _0x3b273c + "...");
      }
    },
    getTimeStamp() {
      const _0x230c27 = new Date();
      return "[" + _0x230c27.getHours() + ":" + _0x230c27.getMinutes() + ":" + _0x230c27.getSeconds() + "." + _0x230c27.getMilliseconds() + "]";
    },
    connectScript(_0x50259c, _0x5837f1 = "text/javascript") {
      const _0xb20668 = document.createElement("script");
      _0xb20668.type = _0x5837f1;
      _0xb20668.async = false;
      _0xb20668.src = _0x50259c;
      document.body.append(_0xb20668);
      jsLoader.log.makeLog("JsLoader", "(info) Loaded a script " + _0x50259c + "...");
    },
    connectAllScriptsFromModsFolder() {
    //   jsLoader.socket.sendEvent("getListOfScripts", _0x4d592c => {
    //     const [_0x159157, _0x28197d] = _0x4d592c.data.split("|");
    //     if (_0x159157 == "getListOfScripts" && _0x28197d.length > 0) {
    //       try {
    //         JSON.parse(_0x28197d).forEach(_0x5dad3d => {
    //           if (_0x5dad3d.includes("module")) {
    //             this.connectScript("mods/" + _0x5dad3d, "module");
    //           } else {
    //             this.connectScript("mods/" + _0x5dad3d);
    //           }
    //         });
    //         jsLoader.log.makeLog("JsLoader", "(info) Loaded all scripts...");
    //       } catch (_0x5a6add) {
    //         jsLoader.log.makeLog("JsLoader", "(error) Error with loading script: " + _0x5a6add.message + "...");
    //       }
    //     }
    //   });
    },
    onJsLoaderInit() {
      window.openInterface("GameText");
      this.mainMenu._waitOpenInterface();
      this.network.init();
      if (!location.href.includes("local.game")) {
        return;
      }
      const _0x3de2c8 = jsLoader.runtime.createStyleTag("#app .containers {display: none}", document.head);
      App.components.Containers.options.hideChat = 0;
      App.components.Containers.options.hideHud = 0;
      window.openInterface("Containers");
      jsLoader.runtime.executeFunctionWhen(() => {
        try {
          this.mainMenu.getSkinPath = window.interface("Containers").getItemIcon;
          closeInterface("Containers");
          App.components.Containers.options.hideChat = 1;
          App.components.Containers.options.hideHud = 1;
          setTimeout(() => _0x3de2c8.remove(), 2000);
        } catch (_0x462159) {
          console.error(_0x462159);
        }
      }, () => window.interface("Containers") !== false, "wait containers open", 100);
    },
    init() {
      try {
        window.interface("Hud").useChat = 1;
        this.log.start();
        this.setStyles();
        this.socket.connectToSocket();
        this.x0_2034dsa.init();
        this.utils.openInterfaceOptions.init();
        this.runtime.setHooks();
        this.onJsLoaderInit();
        jsLoader.log.makeLog("JsLoader", "(info) Inited...");
        console.log("%cALCANTARA", "padding: 50px; border-radius: 20px; background: #FC5C7D; background: linear-gradient(to right, #454545, #949494);font-style: italic;font-family: Rebrand,sans-serif; color: #a8a8a8; font-weight: bold; font-size: 50px;text-shadow: 0 0 30px #00000090");
      } catch (_0x4702d3) {
        jsLoader.log.makeLog("JsLoader", "(error) Error with init " + _0x4702d3 + "...");
      }
    }
  };
  jsLoader.runtime.executeFunctionWhen(() => {
    jsLoader.init();
  }, () => window.App !== undefined && window.interface("Hud") !== false, "jsLoader init", 10);
  jsLoader.showAddedScript = (_0x14637b, _0x2d0064) => {
    jsLoader.showConnectedScript(_0x2d0064, _0x14637b);
  };
  class Range extends HTMLElement {
    static get observedAttributes() {
      return ["min", "max", "value", "step", "disabled"];
    }
    constructor() {
      super();
      this._dom = {};
      this.addEventListener("mousedown", this);
      this.addEventListener("keydown", this);
    }
    get _valueAsNumber() {
      let _0x2c18bc = this.hasAttribute("value") ? Number(this.getAttribute("value")) : 50;
      return this._constrain(_0x2c18bc);
    }
    get _minAsNumber() {
      if (this.hasAttribute("min")) {
        return Number(this.getAttribute("min"));
      } else {
        return 0;
      }
    }
    get _maxAsNumber() {
      if (this.hasAttribute("max")) {
        return Number(this.getAttribute("max"));
      } else {
        return 100;
      }
    }
    get _stepAsNumber() {
      if (this.hasAttribute("step")) {
        return Number(this.getAttribute("step"));
      } else {
        return 1;
      }
    }
    get value() {
      return String(this._valueAsNumber);
    }
    get valueAsNumber() {
      return this._valueAsNumber;
    }
    get min() {
      if (this.hasAttribute("min")) {
        return this.getAttribute("min");
      } else {
        return "";
      }
    }
    get max() {
      if (this.hasAttribute("max")) {
        return this.getAttribute("max");
      } else {
        return "";
      }
    }
    get step() {
      if (this.hasAttribute("step")) {
        return this.getAttribute("step");
      } else {
        return "";
      }
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set _valueAsNumber(_0x312bf8) {
      this.value = String(_0x312bf8);
    }
    set min(_0x43d42e) {
      this.setAttribute("min", _0x43d42e);
    }
    set max(_0x545d69) {
      this.setAttribute("max", _0x545d69);
    }
    set value(_0x2a7ef8) {
      this.setAttribute("value", _0x2a7ef8);
    }
    set step(_0xb0bbb0) {
      this.setAttribute("step", _0xb0bbb0);
    }
    set disabled(_0xa4c861) {
      if (_0xa4c861) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
    connectedCallback() {
      if (!this.firstChild) {
        this.innerHTML = "<span class=\"-track\"></span><span class=\"-elapsed\"></span><span class=\"-remaining\"></span><div class=\"-inner\"><button class=\"-thumb\"></button></div>";
        Array.from(this.querySelectorAll("[class^='-']")).forEach(_0x56832f => {
          let _0x5a6fbb = _0x56832f.className.substring(1);
          this._dom[_0x5a6fbb] = _0x56832f;
        });
        this._update();
      }
    }
    attributeChangedCallback(_0x5f0aef, _0x49127d, _0x7d4bd2) {
      if (this.firstChild) {
        switch (_0x5f0aef) {
          case "min":
          case "max":
          case "value":
          case "step":
            this._update();
        }
      }
    }
    handleEvent(_0x3a3749) {
      switch (_0x3a3749.type) {
        case "mousedown":
          if (this.disabled) {
            return;
          }
          document.addEventListener("mousemove", this);
          document.addEventListener("mouseup", this);
          this._setToMouse(_0x3a3749);
          break;
        case "mousemove":
          this._setToMouse(_0x3a3749);
          break;
        case "mouseup":
          document.removeEventListener("mousemove", this);
          document.removeEventListener("mouseup", this);
          this.dispatchEvent(new CustomEvent("change"));
          break;
        case "keydown":
          if (this.disabled) {
            return;
          }
          this._handleKey(_0x3a3749.code);
          this.dispatchEvent(new CustomEvent("input"));
          this.dispatchEvent(new CustomEvent("change"));
      }
    }
    _handleKey(_0x81101) {
      let _0x359d59 = this._minAsNumber;
      let _0x368a0f = this._maxAsNumber;
      let _0x5e03c0 = _0x368a0f - _0x359d59;
      let _0x380544 = this._stepAsNumber;
      switch (_0x81101) {
        case "ArrowLeft":
        case "ArrowDown":
          this._valueAsNumber = this._constrain(this._valueAsNumber - _0x380544);
          break;
        case "ArrowRight":
        case "ArrowUp":
          this._valueAsNumber = this._constrain(this._valueAsNumber + _0x380544);
          break;
        case "Home":
          this._valueAsNumber = this._constrain(_0x359d59);
          break;
        case "End":
          this._valueAsNumber = this._constrain(_0x368a0f);
          break;
        case "PageUp":
          this._valueAsNumber = this._constrain(this._valueAsNumber + _0x5e03c0 / 10);
          break;
        case "PageDown":
          this._valueAsNumber = this._constrain(this._valueAsNumber - _0x5e03c0 / 10);
      }
    }
    _constrain(_0x1fbe89) {
      const _0x59755b = this._minAsNumber;
      const _0x231fe3 = this._maxAsNumber;
      const _0x1bc807 = this._stepAsNumber;
      _0x1fbe89 = Math.max(_0x1fbe89, _0x59755b);
      _0x1fbe89 = Math.min(_0x1fbe89, _0x231fe3);
      _0x1fbe89 -= _0x59755b;
      _0x1fbe89 = Math.round(_0x1fbe89 / _0x1bc807) * _0x1bc807;
      if ((_0x1fbe89 += _0x59755b) > _0x231fe3) {
        _0x1fbe89 -= _0x1bc807;
      }
      return _0x1fbe89;
    }
    _update() {
      let _0x43a1bd = this._minAsNumber;
      let _0x1ee9e4 = this._maxAsNumber;
      let _0x4ba287 = (this._valueAsNumber - _0x43a1bd) / (_0x1ee9e4 - _0x43a1bd);
      this._dom.thumb.style.left = _0x4ba287 * 100 + "%";
      this._dom.remaining.style.left = _0x4ba287 * 100 + "%";
      this._dom.elapsed.style.width = _0x4ba287 * 100 + "%";
    }
    _setToMouse(_0xd2716c) {
      let _0x470b50 = this._dom.inner.getBoundingClientRect();
      let _0x8c1894 = _0xd2716c.clientX;
      _0x8c1894 = Math.max(_0x8c1894, _0x470b50.left);
      _0x8c1894 = Math.min(_0x8c1894, _0x470b50.right);
      let _0x480a20 = this._minAsNumber;
      let _0x12e7b6 = this._maxAsNumber;
      let _0x3d6314 = (_0x8c1894 - _0x470b50.left) / (_0x470b50.right - _0x470b50.left);
      let _0x46fb16 = this._constrain(_0x480a20 + _0x3d6314 * (_0x12e7b6 - _0x480a20));
      if (_0x46fb16 != this._valueAsNumber) {
        this._valueAsNumber = _0x46fb16;
        this.dispatchEvent(new CustomEvent("input"));
      }
    }
  }
  customElements.define("x-range", Range);
  class JslSelectUI {
    constructor(_0x2793ae, _0x591370, _0x3563e7) {
      this.data = _0x2793ae;
      this.selectedId = _0x591370;
      this.callBack = _0x3563e7;
      this.$el = null;
      this.$placeholder = null;
      this.$input = null;
      this.dropdownHtml = "";
      this.placeholderText = "";
      this.#e();
      this.#t();
    }
    #e() {
      this.dropdownHtml = this.data.map(_0x3e5f5a => {
        let _0x3a5467 = "";
        if (_0x3e5f5a.id === this.selectedId) {
          _0x3a5467 = "jsl-select__dropdown-item--selected";
          this.placeholderText = _0x3e5f5a.value;
        }
        return "<li class=\"jsl-select__dropdown-item " + _0x3a5467 + "\" data-type=\"item\" data-id=\"" + _0x3e5f5a.id + "\">" + _0x3e5f5a.value + "</li>";
      }).join("");
    }
    get selectedItem() {
      return this.data.find(_0x2c74d7 => _0x2c74d7.id === this.selectedId);
    }
    get $selectedItem() {
      return this.$el.querySelector("[data-id=\"" + this.selectedId + "\"]");
    }
    #t() {
      this.$el = document.createElement("div");
      this.$el.className = "jsl-select";
      this.$el.innerHTML = "<div class=\"jsl-select__backdrop\" data-type=\"backdrop\"></div> <div class=\"jsl-select__data\"> <svg class=\"jsl-select__arrow\" width=\"10\" height=\"6\" viewBox=\"0 0 10 6\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M5 6L-5.24537e-07 1.8279e-06L5 2.1L10 0L5 6Z\" fill=\"#F4F1E1\"></path> </svg> <div class=\"jsl-select__value\">" + this.placeholderText + "</div> </div> <ul class=\"jsl-select__dropdown\"> " + this.dropdownHtml + " </ul>";
      this.$input = this.$el.querySelector(".jsl-select__data");
      this.$placeholder = this.$el.querySelector(".jsl-select__value");
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.onclick = this.clickHandler;
    }
    #n(_0x45603d) {
      this.$selectedItem.classList.remove("jsl-select__dropdown-item--selected");
      this.selectedId = _0x45603d;
      this.$selectedItem.classList.add("jsl-select__dropdown-item--selected");
      this.$placeholder.textContent = this.selectedItem.value;
      this.callBack(this.selectedItem);
    }
    clickHandler(_0x9200c9) {
      const {
        type: _0x5420ad,
        id: _0x562386
      } = _0x9200c9.target.dataset;
      if (_0x9200c9.target === this.$input || this.$input.contains(_0x9200c9.target)) {
        if (this.$el.classList.contains("jsl-select-open")) {
          this.#s();
        } else {
          this.#o();
        }
      }
      if (_0x5420ad === "backdrop") {
        this.#s();
      }
      if (_0x5420ad === "item") {
        this.#s();
        this.#n(_0x562386);
      }
    }
    #o() {
      this.$el.classList.toggle("jsl-select-open", true);
    }
    #s() {
      this.$el.classList.toggle("jsl-select-open", false);
    }
    get getEl() {
      return this.$el;
    }
  }
  class JslBindUI {
    constructor(_0x35bf51, _0x8dafb9, _0x5879bf) {
      this.keyCode = _0x35bf51;
      this.defaultKeyCode = _0x8dafb9;
      this.callback = _0x5879bf;
      this.isBindingBtn = false;
      this.$el = null;
      this.$char = null;
      this.$resetBtn = null;
      this.FKeys = {
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12"
      };
      this.#t();
    }
    get getCharFromCode() {
      if (this.keyCode === -1) {
        return "none";
      } else if (this.keyCode >= 112 && this.keyCode <= 123) {
        return this.FKeys[this.keyCode];
      } else {
        return String.fromCharCode(this.keyCode);
      }
    }
    get getEl() {
      return this.$el;
    }
    clickHandler() {
      if (!this.isBindingBtn) {
        this.$el.classList.add("jsl-bind-active");
        this.#i("...");
        document.body.addEventListener("keyup", this.onKeyUp);
        this.isBindingBtn = true;
        return;
      }
    }
    onReset() {
      this.keyCode = this.defaultKeyCode;
      this.#a();
    }
    onKeyUp(_0x27648b) {
      _0x27648b.preventDefault();
      _0x27648b.stopPropagation();
      if (_0x27648b.keyCode === 46 || _0x27648b.keyCode === 8) {
        this.keyCode = -1;
      } else if (_0x27648b.keyCode >= 65 && _0x27648b.keyCode <= 90 || _0x27648b.keyCode >= 48 && _0x27648b.keyCode <= 57 || _0x27648b.keyCode >= 112 && _0x27648b.keyCode <= 123) {
        this.keyCode = _0x27648b.keyCode;
      }
      this.#a();
    }
    #i(_0x370829) {
      this.$char.textContent = _0x370829;
    }
    #a() {
      this.#i(this.getCharFromCode);
      this.isBindingBtn = false;
      this.$el.classList.remove("jsl-bind-active");
      document.body.removeEventListener("keyup", this.onKeyUp);
      document.body.removeEventListener("click", this.clickHandlerBody);
      this.callback(this.keyCode);
    }
    #t() {
      this.$el = document.createElement("div");
      this.$el.className = "jsl-bind";
      this.$el.innerHTML = "<div class=\"jsl-bind__backdrop\"></div> <svg class=\"jsl-bind__reset\" xmlns=\"http://www.w3.org/2000/svg\" width=\"58\" height=\"53\" viewBox=\"0 0 58 53\" fill=\"none\"> <path d=\"M25.5215 0C30.1758 0 39.3514 0 39.3514 0L45.3355 13.2315L48.0616 12.1012L43.6121 24.6753L30.5747 19.1491L33.6332 17.6198L29.1119 9.50805L11.1597 12.2341L21.3326 0H25.5215Z\" fill=\"white\" /> <path d=\"M7.71283 45.3366C5.11972 41.4802 0 33.9004 0 33.9004L7.57985 21.5332L5.11972 19.871L18.822 16.0679L20.7448 30.3764L17.8193 28.7141L13.6304 37.0254L26.463 49.7914H10.6384L7.71283 45.3366Z\" fill=\"white\" /> <path d=\"M56.2294 36.5153C54.3012 40.7707 50.5777 49.0819 50.5777 49.0819H36.0829L35.95 52.0075L26.397 42.4329L36.6813 33.1908L36.8143 36.5818L46.1229 35.7839L50.9767 18.3636L57.9581 32.6589L56.2294 36.5153Z\" fill=\"white\" /> </svg> <div class=\"jsl-bind__char\">" + this.getCharFromCode + "</div>";
      this.$char = this.$el.querySelector(".jsl-bind__char");
      this.$resetBtn = this.$el.querySelector(".jsl-bind__reset");
      this.$el.querySelector(".jsl-bind__backdrop").onclick = () => {
        this.#a();
      };
      this.clickHandler = this.clickHandler.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.onReset = this.onReset.bind(this);
      this.$char.onclick = this.clickHandler;
      this.$resetBtn.onclick = this.onReset;
    }
}