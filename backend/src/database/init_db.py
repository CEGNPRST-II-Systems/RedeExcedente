from database.session import engine
from models.material import Material as MaterialModel
from sqlalchemy.orm import Session


def init_db():
    db = Session(bind=engine)
    try:
        if db.query(MaterialModel).count() == 0:
            initial_data = [
                MaterialModel(
                    id="1",
                    title="15 Cadeiras Escolares Infantis",
                    ngoName="Instituto Futuro Brilhante",
                    ngoRegistration="ONG-84920",
                    category="Mobiliário",
                    zone="Zona Leste",
                    quantity=15,
                    condition="Usado - Bom estado",
                    contact="(11) 98888-1234",
                    description="Cadeiras anatômicas infantis, sem detalhes graves.",
                ),
                MaterialModel(
                    id="2",
                    title="5 Computadores Desktop (Core i3)",
                    ngoName="Rede Solidária Tech",
                    ngoRegistration="ONG-33102",
                    category="Tecnologia",
                    zone="Centro",
                    quantity=5,
                    condition="Usado - Bom estado",
                    contact="(11) 97777-5678",
                    description="Formatados, prontos para uso em "
                    "laboratório comunitário.",
                ),
                MaterialModel(
                    id="3",
                    title="80kg de Feijão e Arroz (Validade: 6 meses)",
                    ngoName="Ação Comunitária Viver",
                    ngoRegistration="ONG-12093",
                    category="Alimentos",
                    zone="Zona Norte",
                    quantity=80,
                    condition="Novo",
                    contact="(11) 96666-9999",
                    description="Excedente de arrecadação da última campanha.",
                ),
                MaterialModel(
                    id="4",
                    title="10 Cadeiras de Escritório Giratórias",
                    ngoName="Instituto Crescer Juntos",
                    ngoRegistration="12.345.678/0001-90",
                    category="Mobiliário",
                    zone="Zona Leste",
                    quantity=10,
                    condition="Usado - Bom estado",
                    contact="(11) 98765-321",
                    description="Cadeiras com regulagem de altura e estofamento "
                    "preto em ótimo estado de conservação, prontas para "
                    "uso em salas de aula ou escritórios administrativos. "
                    "Retirada no local.",
                ),
            ]
            db.add_all(initial_data)
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error initializing DB: {e}")
    finally:
        db.close()
