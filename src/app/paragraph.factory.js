/**
 * The ParagraphFactory is a singleton that returns paragraphs on request from an array of Lorem Ipsum text.
 */
'use strict';
angular.module('writeBooks.paragraph', [])
    .factory('ParagraphFactory', [
        function() {

            const MAX_PARAGRAPHS_TO_RETURN = 1000;

            const LOREM_IPSUM_PARAGRAPHS = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis ipsum purus. Etiam lacus sem, finibus ut luctus ac, scelerisque non sapien. Aliquam porttitor semper purus. Cras egestas sodales tempus. Nulla facilisi. Praesent molestie ultricies dolor vitae aliquet. Pellentesque sollicitudin nulla sed orci dapibus, vitae consectetur dolor molestie. Aliquam consectetur dapibus tellus. Praesent posuere, odio et ultricies elementum.",

                "Integer pellentesque dolor sed aliquam egestas. Sed viverra bibendum ex viverra semper. Ut vehicula nisl et dui varius, sit amet fermentum nulla mattis. Pellentesque eget dictum quam. Quisque vestibulum leo ac sem sollicitudin, vel scelerisque ante placerat. Quisque euismod luctus metus. Aliquam lectus lorem, aliquet eget erat quis, finibus ultrices tellus. Vestibulum vel libero id libero scelerisque venenatis.",

                "Aenean tincidunt libero vel pretium ornare. Donec libero tortor, blandit non lectus sed, lobortis suscipit eros. Etiam eu mauris sagittis, laoreet tellus a, interdum sapien. Sed ac volutpat tellus, at blandit nulla. Curabitur rhoncus leo et diam tempus laoreet. Quisque hendrerit ex at interdum vulputate. Cras ut dictum risus, quis faucibus elit. In tempor vulputate dui blandit fermentum. Pellentesque vel magna eu diam fringilla congue.",

                "Nulla rhoncus a sem sit amet lobortis. Vivamus lacinia, sem sed egestas feugiat, dolor lacus rutrum velit, ut vulputate neque arcu tincidunt velit. Nam maximus consectetur augue congue pharetra. Fusce sed sodales purus. Pellentesque cursus lectus et elementum rutrum. Cras in lorem dolor. In consequat, neque eu lacinia fermentum, metus dui tincidunt augue, tincidunt pulvinar justo ante nec leo. Proin rhoncus aliquam ex eu sodales.",

                "Nulla eu feugiat ipsum. Sed ipsum justo, facilisis in interdum in, sodales nec magna. Donec at condimentum elit. Morbi dictum leo vel tortor molestie, ac pretium magna maximus. Sed cursus eros arcu, non tristique quam egestas in. Aliquam aliquam lorem mi. Proin hendrerit gravida fringilla. Integer scelerisque tempor dolor, consequat molestie ipsum sollicitudin ut. Vivamus tempor eros sed libero efficitur ullamcorper.",

                "Praesent iaculis enim ac tristique lobortis. Nam tristique aliquam nunc vitae blandit. Nunc euismod, neque a congue placerat, est erat fringilla nulla, nec dapibus orci augue in ex. Nulla facilisi. Maecenas sem velit, pellentesque et dictum quis, aliquam in est. Cras porta ante sed finibus mollis. Ut id vestibulum nibh, ac euismod libero. Nam mollis lacus non pretium scelerisque. Nulla consequat tellus efficitur, varius purus eu, feugiat urna.",

                "Aliquam erat volutpat. Pellentesque interdum condimentum lorem, non lacinia orci rutrum eu. Duis commodo odio nec viverra blandit. Praesent molestie molestie tortor eget malesuada. Nam dapibus condimentum dapibus. Fusce aliquam nec augue vel mollis. Maecenas non velit eget nulla porta interdum. Suspendisse cursus finibus odio, eget venenatis urna porta in. Vivamus sit amet luctus ante, eget dictum odio. Fusce imperdiet odio sed mauris pulvinar mollis.",

                "Etiam consequat ipsum id orci tempor cursus. Aenean id enim nec lectus malesuada dignissim eget in lorem. Vivamus ultricies, orci eget gravida dictum, augue sapien ornare erat, in fringilla felis neque at ligula. Donec id metus sit amet est commodo blandit. Morbi finibus fermentum pulvinar. Quisque id fermentum purus. Vestibulum massa augue, scelerisque eu eros quis, blandit ultricies magna. Aenean faucibus accumsan bibendum.",

                "Proin semper sit amet dui congue vehicula. Integer cursus nisi turpis, sit amet porttitor lacus volutpat a. Pellentesque ut eros semper, placerat enim vel, commodo nunc. Mauris ultricies posuere erat at vestibulum. Cras odio arcu, luctus et diam ac, interdum fringilla ante. Vestibulum mollis rhoncus urna a cursus. Nullam ut quam vitae turpis elementum vulputate vel eget dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;",

                "Curabitur in lacinia justo. Cras sit amet scelerisque nunc, at blandit metus. Sed sollicitudin porta leo ut consectetur. Sed est lorem, facilisis et ligula et, tincidunt tempor metus. Proin aliquet dolor metus, sit amet tincidunt urna aliquet ac. In sollicitudin dui sit amet lorem sodales lacinia. Phasellus ultrices magna vitae felis blandit, aliquam posuere nunc luctus. Curabitur sit amet erat non quam iaculis ultricies.",

                "Aenean velit mauris, malesuada at imperdiet ac, venenatis posuere turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nulla tortor, pharetra sit amet turpis cursus, aliquet consequat metus. Duis faucibus est non eros lacinia, vitae tempor ligula sagittis. In eu aliquet erat. Duis vel auctor erat. In fermentum ut elit quis venenatis. Integer aliquam orci vitae nibh eleifend, ullamcorper consectetur ex vehicula.",

                "Sed ac sem id nulla dictum pulvinar ut non metus. In hac habitasse platea dictumst. Suspendisse sit amet lorem eget felis luctus egestas. Nam tellus mauris, elementum nec suscipit sed, facilisis non diam. Proin efficitur auctor placerat. Etiam rutrum, nisl lacinia molestie tempus, mauris est lacinia mi, quis sollicitudin nulla diam a dui. Nullam tempor viverra tortor non blandit. Quisque ac tortor eu dolor pellentesque congue.",

                "Vivamus ultricies eu nunc eget tincidunt. Donec et neque non nulla accumsan ullamcorper in sed est. Morbi ut scelerisque turpis. Aliquam sit amet porta sem, eget fermentum ante. Praesent sed lacus tincidunt nulla feugiat vestibulum. Nam sollicitudin vitae ex ullamcorper sollicitudin. Nam sagittis quam ac tellus porta ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc justo sapien, rutrum ac eros ac, semper pulvinar augue.",

                "Morbi felis metus, imperdiet eget orci vel, sollicitudin semper leo. Nulla ut arcu vel massa euismod rutrum ac vel lorem. Mauris mattis mattis nisi, eu suscipit tellus vulputate vitae. In id purus vitae nisl viverra efficitur vitae sed velit. In placerat, sapien nec finibus iaculis, erat sem rhoncus sem, at gravida ex enim eget lectus. Aliquam consectetur vestibulum scelerisque. Nunc ultrices dignissim rhoncus.",

                "Vivamus porta orci eros, at pellentesque tellus sollicitudin sit amet. Duis sit amet hendrerit elit. In hac habitasse platea dictumst. Morbi a aliquet enim, eu ultrices purus. Vestibulum eget leo sit amet tortor rhoncus blandit id a orci. Integer massa justo, hendrerit quis gravida eu, iaculis quis ex. Pellentesque fermentum risus vitae urna volutpat bibendum. Aenean sit amet bibendum quam. Donec iaculis odio ante.",

                "In auctor, leo ac elementum fermentum, metus nibh tristique mauris, sit amet fermentum mi quam vitae augue. Sed eget dictum mauris, non tincidunt turpis. Nam sed luctus lectus. Duis et nisl id elit consectetur fermentum. Nulla sed aliquet libero, vitae varius nisi. Donec scelerisque tellus eget lorem lobortis bibendum. Phasellus congue urna eget augue varius, a sodales nibh ultricies. Morbi mollis fermentum turpis sit amet egestas.",

                "Aenean interdum vestibulum condimentum. Nullam suscipit ex nisi, eu convallis dolor consequat eget. Curabitur vitae hendrerit lacus. Pellentesque eget libero non leo faucibus egestas sed non ex. In id faucibus mauris, in facilisis urna. Praesent porttitor metus sit amet nunc rutrum cursus. Praesent ultricies ipsum diam, eu bibendum arcu volutpat sit amet. Maecenas non mi feugiat, tempor lacus sed, tincidunt ex.",

                "Nam vestibulum mollis eros, non fermentum mi egestas non. Vivamus porttitor dolor metus, a vehicula neque ornare id. Curabitur a justo non leo blandit laoreet scelerisque quis justo. Vivamus luctus dapibus sapien a cursus. Morbi pulvinar hendrerit enim, id molestie purus laoreet at. Sed vel rhoncus tellus. Suspendisse in purus leo. Mauris venenatis nibh non tristique placerat. Morbi nibh felis, vulputate id lacus eget, vulputate vestibulum lacus.",

                "Aliquam eu turpis ipsum. Quisque eleifend et leo vitae dictum. Fusce tempus mi vel est sodales, a interdum velit iaculis. Maecenas aliquet lacinia consequat. Mauris tempus scelerisque ipsum at mollis. Duis vel leo nec neque laoreet bibendum quis sed massa. Proin placerat lectus at leo elementum, et facilisis metus viverra. Morbi eu leo eleifend, aliquam est vel, rhoncus nulla. Pellentesque convallis convallis neque in porttitor.",

                "Phasellus et magna posuere, volutpat tellus a, faucibus velit. Aenean aliquet lacus ut lacinia congue. Pellentesque eu laoreet est, eu varius enim. Etiam malesuada dolor ut pharetra consectetur. Suspendisse luctus magna nec fringilla commodo. Aliquam varius eu odio id mollis. Etiam tempor lacus lobortis, sagittis neque ac, euismod ante. Fusce a tempus orci, sit amet facilisis sapien. Etiam bibendum magna non lobortis bibendum.",

                "Donec nec euismod lorem, sit amet rutrum tellus. Phasellus ac nibh a magna suscipit dignissim. Duis at tincidunt quam. Pellentesque et interdum magna. In tempus aliquet nunc, id lobortis eros iaculis posuere. Donec imperdiet neque turpis, non lacinia lectus tempor sit amet. Duis cursus sollicitudin fermentum. Maecenas sodales scelerisque sem nec mattis. Vivamus eu lectus egestas, rutrum quam vitae, consequat lacus.",

                "Nulla facilisi. Vivamus volutpat ligula pulvinar viverra mollis. Praesent ut ornare ligula. Mauris bibendum, mi a egestas fermentum, libero velit laoreet ipsum, ultricies ultricies mauris urna id quam. Aliquam a sem in lorem dapibus mattis. Donec et posuere arcu. Nulla rhoncus blandit lectus sit amet facilisis. Nam egestas vel erat ac luctus. Maecenas laoreet sapien vitae fringilla faucibus.",

                "Donec libero ipsum, porttitor a congue non, vulputate vel felis. Aliquam vel suscipit arcu. Quisque luctus blandit tellus id gravida. Praesent pellentesque efficitur sem. Nam aliquam vulputate tincidunt. Mauris id vestibulum nibh. Phasellus at rutrum sapien. Nam id ipsum non leo egestas aliquam in eget purus. Quisque in mi urna. Nunc eget neque vitae elit aliquam imperdiet sed at ligula. Fusce dignissim quam eget arcu cursus, ultrices lacinia justo sodales.",

                "Sed ac luctus tellus, sed interdum turpis. Phasellus quis lectus vulputate, feugiat massa non, consequat felis. Vivamus eget sagittis urna. Curabitur dignissim ante vitae sem suscipit, in lobortis ipsum rutrum. Donec in ex venenatis, pretium nunc imperdiet, aliquam ligula. Quisque interdum enim id imperdiet rutrum. Quisque laoreet congue feugiat. Curabitur consequat bibendum facilisis. In hac habitasse platea dictums.",

                "Sed nec elit turpis. Nunc quis congue enim. Ut neque quam, hendrerit at ex eu, efficitur ullamcorper lectus. Quisque dictum pellentesque eros, non vehicula ante rutrum vitae. Aenean metus est, tincidunt at maximus in, ullamcorper a magna. Cras egestas, ante in fermentum sagittis, enim metus luctus arcu, vitae tristique eros velit eu lectus. Praesent diam risus, ultrices non dolor et, tincidunt placerat ex.",

                "Ut varius porttitor massa, a scelerisque orci interdum nec. Etiam nibh mauris, posuere ut ex in, mattis pretium arcu. Mauris tempus at purus in sodales. Maecenas id semper orci. Nam hendrerit mattis lacus at porttitor. Vestibulum placerat turpis a nisl porta, vel tempor purus ultricies. Sed auctor, leo et viverra finibus, augue nibh aliquam lacus, at laoreet eros ante a nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",

                "Donec molestie odio ut sapien pulvinar tristique. Ut tristique nisi nisl. Phasellus vitae ipsum nibh. Aenean vel dictum nunc, sed fringilla velit. Duis quis neque sit amet velit ullamcorper mollis. Nulla ligula ligula, lacinia in ligula sed, sagittis vehicula dolor. Nullam luctus orci eget justo congue vestibulum. Etiam sed blandit neque. Interdum et malesuada fames ac ante ipsum primis in faucibus.",

                "Morbi vel massa tellus. Ut ac urna sed mauris mattis dignissim. Etiam scelerisque orci eu consequat mollis. Duis eget imperdiet libero. Maecenas sed tortor dui. Suspendisse venenatis, nisl dapibus porta suscipit, mauris orci vestibulum nulla, at rutrum turpis nunc eget sem. Nam eleifend leo ligula. Quisque ac dignissim lorem. Sed blandit sapien et justo pretium vehicula sit amet et ante. In venenatis pulvinar elit, at posuere ex posuere sed.",

                "Praesent in est facilisis, imperdiet leo vitae, tempus dui. Nunc mollis mi eget sagittis vehicula. Suspendisse tincidunt sapien et mauris lobortis, eu gravida nulla faucibus. Maecenas id commodo purus. Nam maximus accumsan auctor. Suspendisse erat elit, eleifend id facilisis id, tempor a felis. Curabitur blandit, eros eu faucibus lobortis, risus ex commodo risus, eu vehicula neque diam ac lectus.",

                "Suspendisse consequat odio in nulla ultrices placerat eget ut velit. Aliquam at ipsum egestas, pulvinar nulla et, pharetra lorem. Aliquam pellentesque elit id bibendum consectetur. Aliquam ligula dolor, tincidunt et nisi ac, ultrices accumsan ante. Vestibulum bibendum enim est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique, nibh vel faucibus tempor, massa elit suscipit nibh, et posuere nibh tortor ut nunc. Sed consectetur condimentum neque.",

                "Nulla lobortis sapien ac enim tincidunt rhoncus. Proin nisi arcu, rhoncus ut est eget, pharetra elementum metus. Suspendisse vestibulum sapien malesuada lorem consequat tincidunt. Nullam interdum quam mauris, non tincidunt dolor maximus non. Quisque interdum, mauris vel fermentum convallis, nibh libero malesuada justo, vitae ultricies est mauris eu leo. Nam in sodales sapien. Vivamus ultrices sapien et erat cursus, vitae eleifend ex aliquet.",

                "Fusce volutpat diam a laoreet posuere. Quisque auctor tincidunt dolor quis laoreet. Integer erat lorem, sagittis id purus et, porttitor iaculis nulla. Aliquam erat volutpat. Nulla ultricies pulvinar dolor id iaculis. Nunc et consequat neque. Aliquam ornare nibh nulla, in varius metus ornare ut. Vivamus arcu est, suscipit et aliquet sit amet, hendrerit vitae enim. Nunc lacinia accumsan justo sed mattis.",

                "Quisque consectetur metus quis fermentum feugiat. Mauris eros arcu, fermentum quis porttitor quis, condimentum non nisi. Pellentesque nisi neque, sollicitudin eu ullamcorper vel, lacinia non nisi. Nullam imperdiet tempus erat in porttitor. In consectetur, lectus eget vehicula tristique, enim neque interdum quam, quis bibendum nunc erat id lorem. Nunc luctus blandit justo, in feugiat quam. Donec volutpat neque quis dui faucibus, quis molestie nunc imperdiet.",

                "Suspendisse gravida diam lorem, nec imperdiet justo sollicitudin eget. Donec eget rhoncus mi, in pulvinar neque. Sed ut mauris faucibus, dapibus ipsum eget, venenatis tortor. Integer egestas eu tellus ac auctor. Integer egestas sem sit amet condimentum commodo. Suspendisse in nulla ante. Cras et dictum est. Mauris id tellus sapien. Curabitur eget maximus justo. Curabitur tristique sit amet ipsum vel tincidunt.",

                "Duis nisl magna, egestas vel tortor non, iaculis imperdiet nisi. Nunc iaculis a orci ut consequat. Mauris pharetra dui nec orci dictum, nec sodales enim luctus. Sed ultrices dolor eu odio tincidunt, vitae elementum justo eleifend. Fusce ac quam nulla. Donec luctus, ligula at gravida lacinia, arcu dolor condimentum neque, ut vestibulum dui metus ac metus. Nulla facilisi. Etiam eu tortor vitae nibh pretium commodo non at nunc.",

                "Cras eget libero in enim euismod viverra placerat id dui. Integer lacinia laoreet sapien, ac fermentum nibh. Donec aliquet lorem nec rutrum facilisis. Mauris fermentum quam consequat, consectetur massa ac, semper massa. Phasellus sed urna non purus condimentum euismod. Cras laoreet euismod finibus. Donec commodo molestie orci, at aliquet erat bibendum eu. Etiam gravida odio ac ex scelerisque commodo.",

                "Duis lectus nulla, egestas quis justo eu, convallis posuere quam. Nam tempor nunc sit amet quam iaculis tristique. Morbi tempus ut purus eget porttitor. Pellentesque dapibus maximus tellus. Duis ut ante placerat, posuere sapien eget, sollicitudin lectus. Donec consectetur eros vel metus porta ullamcorper. Praesent laoreet lacinia maximus. Aliquam eget dui pellentesque massa malesuada viverra.",

                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eu mauris ut sem egestas cursus. Vivamus at pretium purus. Nulla dolor massa, dapibus eget finibus nec, egestas ac arcu. Curabitur eget porttitor urna. Sed at ligula eros. Phasellus tincidunt efficitur rutrum. Nulla consectetur quis libero in lacinia. Morbi quis lacus enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

                "Sed vel augue fringilla eros luctus sodales. Aliquam eu nulla quam. Maecenas ut massa risus. Etiam ut neque id dolor efficitur tincidunt a quis augue. Vivamus felis risus, tempor a convallis sed, ultricies vel nunc. Nulla nec augue vel metus fermentum lacinia eget id ipsum. Sed ut nunc lectus. Vivamus blandit non arcu eu accumsan. Sed vitae aliquet elit. Maecenas scelerisque, risus in pellentesque malesuada, neque leo sagittis quam.",

                "Ut vel convallis dolor. Nunc sed facilisis turpis. Cras id euismod justo. Curabitur tincidunt consequat velit, vitae maximus lectus ultrices eu. Nunc non nulla mollis, sodales magna sit amet, mattis libero. Fusce consectetur condimentum mattis. Proin vitae nisi dui. Cras vitae lectus tristique, luctus lorem quis, facilisis arcu. Aliquam auctor tortor quis lobortis suscipit.",

                "Duis efficitur lacus sed egestas viverra. Nullam id risus felis. Mauris pretium pellentesque semper. Integer hendrerit dui dolor, sit amet commodo urna facilisis ut. Morbi nec laoreet metus, eu malesuada nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus libero, tempus vitae libero dapibus, viverra pulvinar augue. Praesent viverra nisi nec nisl volutpat congue.",

                "Nulla varius vehicula ligula et feugiat. Nulla magna enim, interdum vel rhoncus eget, consequat sed sem. Donec in venenatis nulla, a vestibulum velit. Suspendisse commodo aliquam lectus. Suspendisse potenti. Nulla a scelerisque sem, ac sollicitudin nulla. Praesent at euismod urna. Sed in tempus lectus. Sed sapien dolor, lobortis ac lectus id, facilisis pharetra eros. Aenean nibh dolor, consequat vel consectetur at, mattis vitae massa.",

                "Sed blandit libero non mi molestie, a porta orci tristique. Vestibulum facilisis, eros ut molestie dignissim, mi mi ullamcorper nisi, eget dignissim urna leo at magna. Duis nec molestie urna. Vestibulum pulvinar arcu laoreet, vehicula quam vel, cursus nulla. In commodo diam ut lacus interdum, a porta erat placerat. Nulla pulvinar mauris quis metus elementum, nec mattis nisl laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

                "Phasellus sed metus vitae mi ultrices tincidunt. Phasellus efficitur nibh posuere ornare fringilla. Vestibulum dapibus, leo vitae finibus condimentum, dui est suscipit lorem, non condimentum augue massa id dui. Curabitur imperdiet quam sit amet risus pulvinar, at varius nunc mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo metus, tincidunt at vehicula in, tempus vel ipsum.",

                "Pellentesque iaculis nulla in luctus congue. Mauris tempor sem at urna lacinia vestibulum. Proin cursus at diam eu bibendum. Quisque leo velit, aliquet in felis a, dapibus lacinia tellus. Nam sem felis, faucibus ac porta sit amet, elementum sit amet purus. Donec et bibendum sem. Vestibulum sagittis dictum auctor. Suspendisse malesuada lorem sit amet massa dignissim aliquet non non justo.",

                "Nam varius mauris non iaculis volutpat. Nulla nec libero sodales, dapibus arcu eget, pellentesque nisl. Cras a lacus aliquet, ornare sapien sit amet, faucibus est. Duis pulvinar cursus lorem. Mauris eu vehicula tellus, vel lacinia libero. Nam ac nulla quis dolor vulputate cursus eget eget nunc. Cras faucibus facilisis urna, nec eleifend mauris lacinia ut. Nullam ipsum nulla, facilisis non bibendum ac, accumsan vitae enim.",

                "Morbi accumsan sapien felis, sed porttitor erat egestas nec. Phasellus malesuada quis leo ut lacinia. Sed et efficitur nisi. Mauris imperdiet auctor dolor non convallis. Integer scelerisque libero non justo accumsan, ut lobortis leo feugiat. Phasellus luctus, orci non hendrerit dignissim, eros magna efficitur dolor, sit amet scelerisque odio nibh quis dui. Cras vitae euismod ligula.",

                "Sed convallis ex felis, at dapibus nisl tincidunt vel. Morbi dolor orci, consequat vel lacus at, hendrerit facilisis orci. Proin non tincidunt ligula. Nullam egestas congue ultricies. Donec sed mollis odio. Ut diam ligula, dignissim ut mollis quis, viverra vitae arcu. Sed commodo tellus rutrum, efficitur sem ut, pretium risus. Quisque quis ornare orci, at accumsan augue. Sed facilisis tempor eros quis lacinia. Proin at est sodales.",

                "Sed sodales pharetra nibh quis condimentum. Vivamus mattis purus in feugiat laoreet. Integer tincidunt quam nec dui feugiat, vel elementum ipsum porta. In efficitur odio enim, at volutpat sem tincidunt nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris gravida diam sit amet magna commodo finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate ultrices rhoncus.",

                "Integer vitae purus libero. Aenean diam tellus, mattis eu viverra non, malesuada at tortor. Integer vitae interdum enim. Sed vulputate pellentesque vulputate. Sed a massa urna. Ut eu tincidunt augue, et accumsan nulla. Etiam vel finibus lectus, at tempor est. Duis nunc ante, viverra in tincidunt at, semper id ipsum. Quisque ante tortor, ultricies eget urna ac, tincidunt gravida nisi.",

            ];

            let nextIndex = 0;

            function ParagraphFactory() {
            }

            /**
             * Returns the next n paragraphs of lorem ipsum.  After exhausting our unique supply, we start over again
             * at the beginning.
             */
            ParagraphFactory.nextParagraphs = function(n) {
                let arr = [];
                if (n < 0 || n > MAX_PARAGRAPHS_TO_RETURN) {
                    throw new Error('out of range, n: ' + n);
                }
                while (nextIndex + n > LOREM_IPSUM_PARAGRAPHS.length) {
                    arr = arr.concat(LOREM_IPSUM_PARAGRAPHS.slice(nextIndex, LOREM_IPSUM_PARAGRAPHS.length));
                    n -= LOREM_IPSUM_PARAGRAPHS.length - nextIndex;
                    nextIndex = 0; //Start over again.
                }
                arr = arr.concat(LOREM_IPSUM_PARAGRAPHS.slice(nextIndex, nextIndex + n));
                nextIndex += n;
                return arr;
            };

            return ParagraphFactory;
        }
    ]);