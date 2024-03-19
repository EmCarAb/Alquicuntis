from app.controllers.pedidos_controller import create_pedido, delete_pedidos, get_pedidos, get_pedidos_usuario
from app.controllers.productos_controller import create_producto, delete_productos, get_producto_by_id, get_productos, update_producto, uploaded_file
from app.controllers.solicitudes_controller import create_solicitud, delete_solicitudes, get_solicitud
from app.controllers.usuarios_controller import login, signin, create_user

base_path = "/api"

def include_routers(app):
    
    app.route(base_path + '/productos', methods=['POST'])(create_producto)
    app.route(base_path + '/productos', methods=['GET'])(get_productos)
    app.route(base_path + '/productos/<int:id>', methods=['GET'])(get_producto_by_id)
    app.route(base_path + '/productos/<int:id>', methods=['DELETE'])(delete_productos)
    app.route(base_path + '/productos/<int:id>', methods=['PUT'])(update_producto)
    app.route(base_path + '/imagenes/<filename>')(uploaded_file)
    app.route(base_path + '/login', methods=['POST'])(login)
    app.route(base_path + '/solicitudes', methods=['POST'])(create_solicitud)
    app.route(base_path + '/solicitudes', methods=['GET'])(get_solicitud)
    app.route(base_path + '/solicitudes/<int:id>', methods=['DELETE'])(delete_solicitudes)
    app.route(base_path + '/usuarios', methods=['POST'])(create_user)
    app.route(base_path + '/usuarios', methods=['GET'])(signin)
    app.route(base_path + '/pedidos', methods=['POST'])(create_pedido)
    app.route(base_path + '/pedidos', methods=['GET'])(get_pedidos)
    app.route(base_path + '/pedidos-usuario', methods=['GET'])(get_pedidos_usuario)
    app.route(base_path + '/pedidos/<int:id>', methods=['DELETE'])(delete_pedidos)