import SudokuParser from "@/sudoku/SudokuParser";
import SudokuDatabase from "@/sudoku/SudokuDatabase";


window.load_test_data = function() {
  const opensudoku = '<?xml version="1.0" encoding="UTF-8"?><opensudoku>  <name>Sudoku Medium</name>  <author>romario333</author>  <description></description>  <comment></comment>  <created>2009-09-16</created>  <source>gnome-sudoku</source>  <level>medium</level>  <sourceURL>https://opensudoku.moire.org/#about-puzzles</sourceURL>  <game data="980160000206000030000804090100005307008000900307200001020908000010000809000071065" />  <game data="306009801000846000002005040503060020008000600090020405060900300000753000709600502" />  <game data="340200050007840090002035006070460009000090000600027080800910300010053900030004012" />  <game data="306009850007040200000005006570460029408090607690027085800900000004050900039600502" />  <game data="210930600000800102000010390000503008720000063800206000093060000608009000002081036" />  <game data="700020530008756400019000070200030060605000902090060003050000820002598300083070009" />  <game data="602001003140706005050200010090300000400000006000008030070003060500902081300400907" />  <game data="602700008040098602090260043060000071000000000410000060820047010104530080900002407" />  <game data="006470002845009000007000800000800903010902080409001000001000600000600391500093400" />  <game data="503080609470960053600001200840090000007000100000020064004600002960043071702010406" />  <game data="208500009043008020500402800004050002900203004600040900001309005030100690700004201" />  <game data="040000050801000000050806100000207964034601580962504000003408020000000307070000040" />  <game data="000000000004390701051608000908500073045000960170006508000107350507023800000000000" />  <game data="301609000700082100068700000950140020000825000080067051000004790004390002000206504" />  <game data="000600200795480000068030000057140020006020400080067350000010790000098612009006000" />  <game data="007004690080009020601500403000650800062000540005027000208006304030200010059700200" />  <game data="010280009700600018000000500350860490800105007026049053005000000460008005900076020" />  <game data="000080609092604310004001000350002400040000060006700053000400900061908730908070000" />  <game data="000800094000010760005630008056000902370090046109000580500028600081070000960003000" />  <game data="900000300008013060015400080083207000021304670000801250050009140030740500004000006" />  <game data="000039100000000065620100030461780009000403000300016247010007092240000000008250000" />  <game data="800630100190804065600000900001000000752000681000000200006000002240908013008051006" />  <game data="000009120000020000604100030401702309002403600309506207010007802000060000038200000" />  <game data="089006230000020598020400100301090400000301000006040803005002040972050000034900720" />  <game data="010900020700300900390024007000070084007108600680050000100430079003001006050006010" />  <game data="087603004010000007009045180050400300006000200001002040042560800100000060800304710" />  <game data="500003920010900607609000183000400300006159200001002000742000809103007060065300002" />  <game data="001400090030060200200003080057004009800030006300600720060800002005020040080005900" />  <game data="001400000900060250046950107600004009020507010300600005103049570095020008000005900" />  <game data="703002060000040009280000043007014000050609030000730600590000072300060000070300106" />  <game data="500009100004080507917650800076800350400000001051007640002075913705030200003200005" />  <game data="000000001070205480048130605057000006009608500400000130805024910034509060700000000" />  <game data="000950000804000300001300620000480003580207041400093000027009500005000104000016000" />  <game data="400005900050003120072041000240800005080000030700002049000670350037100060006300001" />  <game data="008000910000080000009251003803900604000806000207004108500498300000070000032000700" />  <game data="601000000092380000000012085000127003005000200300596000710230000000071530000000407" />  <game data="080709004500000170037000005006120800100803009008096700700000690069000002200908010" />  <game data="504600002201035009760000000010026400005080200008140060000000024800450907400001806" />  <game data="005028010300107000010090800000650241004702900162084000008060090000209007090870600" />  <game data="082000570600078003937510002000795000005000200000821000500067328200180005073000160" />  <game data="010732006309005000700000080003248100000503000002169300030000001000400907500397060" />  <game data="900070003050300800060004109020089001000103000100750060506900040003007010700010006" />  <game data="136700089900683000207001000000070005090508030700040000000100208000269003520007961" />  <game data="130005080900083000087400006000072695692010734753940000300004270000260003020800061" />  <game data="090600010020019050000028900000003402203701605907200000009140000010830060070006030" />  <game data="000090010000250408000700935050031002801000603900680040493008000502047000010020000" />  <game data="005000216109200470200006030050000082000405000930000040090500007082007309716000800" />  <game data="410005000302019004008640100194200000003407200000001645005074900700920406000500017" />  <game data="400030800070000060050640103100056700003407200007390005605074080080000050009060007" />  <game data="000005000002019060050002003090056038563000291820390040600100080080920400000500000" />  <game data="400030020000019560000002070100006038060407090820300005030100000081920000040060007" />  <game data="000000054046800000750092830023008560080609010069300480074280095000004720930000000" />  <game data="360010400040637029890000006070001900000509000009700080200000048930876050008040093" />  <game data="090030000508206000002070891900500080041060970050009003185020300000604208000050010" />  <game data="006054937000290100095710004608000079000000000210000603900032750001069000562470300" />  <game data="008060000000003009060008401052037046804000705610590280701300020500400000000020600" />  <game data="900200500305009048018300002600007000003000400000800007800003720240500803009002005" />  <game data="000000560002450900000003021607900000320040079000002804210300000009075100056000000" />  <game data="807059102001000800060800050000708043070090020150204000080002010005000400709340208" />  <game data="008000504600001009090640008006453090050102080030867400800034070500200001703000800" />  <game data="078009000005080020392640008080000007000102000900000050800034276060070900000900840" />  <game data="100000005008945010075003400090056100400090007006370040007100820060728500800000006" />  <game data="230069054000003800000170003600000010094316520010000009300082000005600000760450032" />  <game data="009004320502900001000700009090602418018405690764108030600009000900007205057200900" />  <game data="309510760070800050080000300010080603000206000906030070004000010060007080098065407" />  <game data="807305002000008060000740300149203800008000200005407916003092000090500000400601509" />  <game data="500700013300000400080006572742605000900208004000304257275800040009000005430007009" />  <game data="000900030400008090000000502016430025802605903350092760105000000060300008080009000" />  <game data="760500000001600750305000002000096204027000390603470000800000903036005800000003015" />  <game data="009500008200030700085709060510000200420000096003000081050107940006040007900003600" />  <game data="000000950006943072240070600700530401002401500405067009001050046650714200074000000" />  <game data="003078000768152003010000500000000009096703120800000000004000030900835764000640200" />  <game data="130004002602000503007006000000510900370020015001093000000800200905000308200300056" />  <game data="001090060000002007850104020000517032010000080290438000070903046600700000040080700" />  <game data="038704500200600790000090108050800040003109600090005010504060000072008001009307480" />  <game data="054060002100820560008900700603080020000000000070050108001003200042018009700090850" />  <game data="109800072000049800248001003300908060000010000010507004400100385001380000680004109" />  <game data="408010300000070800700809051000000263080000070345000000120604009004030000009020405" />  <game data="007050390000042070520900001902000060015624930060000107100005083030410000059030200" />  <game data="200530900000009000956000120400953000360000049000468001014000396000700000005094007" />  <game data="638921000140600002020030000904000018000803000810000207000080060300005029000296173" />  <game data="070005000100000700840090053934107502000902000508403917750030041003000006000200090" />  <game data="009005084100008729000700600004100060600902008020003900006009000293500006480200300" />  <game data="527090804000000025080400076005180600000706000002053400150004060290000000604010358" />  <game data="000030500000400802003006140000302017027000450310607000036500900904003000002010000" />  <game data="008010040600070090000420003090700130800103007013009080300047000080090004070030800" />  <game data="208000740000005000050028600006080030800163007010050400009840020000600000072000809" />  <game data="017900030008030000209075100040009063002103800980600020006510908000090300090002650" />  <game data="069003000000800403000097286002050018001000300940030700384570000205008000000300850" />  <game data="050436890030000050080005314900600000070090080000001003741200030090000020028754060" />  <game data="062000000314076928000080400000801060008762500020309000003020000695410273000000680" />  <game data="005830610060001809010000000590180030000502000070063085000000090109700040053048200" />  <game data="608700000071006238005802600700000040000679000090000006007108500852400170000007803" />  <game data="270908005300040900806500700027609300000000000003104290008001507001020009700806013" />  <game data="070060005300000968000500740000680350600352001083074000068001000431000009700090010" />  <game data="020730800006510007790000001900182070008405200060973008600000042800047100002051080" />  <game data="030050006806079002002306705000107950040000070078503000604905200500630109300020060" />  <game data="001000356000900000007160409154000007030706040600000132309052800000007000745000200" />  <game data="090805000108090050004620008410230805080000020702089061800062900070050602000901080" />  <game data="600815034020090706004600090000000075580000029730000000040002900901050040260941007" /></opensudoku>';

  const parser = SudokuParser.parse_opensudoku(opensudoku);
  console.log(parser);
  parser.save();
};
