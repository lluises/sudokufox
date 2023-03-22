#include <QGuiApplication>
#include <QCoreApplication>
#include <QUrl>
#include <QString>
#include <QQuickView>

int main(int argc, char *argv[]) {
    QGuiApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    // If I don't enable HighDpiScaling, everything looks small in my screen :v

    QGuiApplication *app = new QGuiApplication(argc, (char**)argv);
    app->setApplicationName("sudokufox.lluise");

    qDebug() << "Starting Sudoku Fox GUI from main.cpp";

    QQuickView *view = new QQuickView();
    view->setSource(QUrl("qrc:/Main.qml"));
    view->setResizeMode(QQuickView::SizeRootObjectToView);
    view->show();

    return app->exec();
}
